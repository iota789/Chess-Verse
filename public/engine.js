export class Engine {
  constructor(boardApi) {
    // initialize fields (remove TS modifiers)
    this.boardApi = boardApi;
    this.stockfish = null;
    this.bestMove = null;
    this.engineName = '';

    const wasmSupported =
      typeof WebAssembly === 'object' &&
      typeof WebAssembly.validate === 'function' &&
      WebAssembly.validate(new Uint8Array([0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00]));

    this.stockfish = new Worker(wasmSupported ? 'stockfish.wasm.js' : 'stockfish.js');

    this.setupListeners();

    this.stockfish.postMessage('uci');
  }

  setupListeners() {
    this.stockfish.addEventListener('message', (evt) => this.handleEngineStdout(evt));
    this.stockfish.addEventListener('error', (err) => console.error(err));
    this.stockfish.addEventListener('messageerror', (err) => console.error(err));
  }

  handleEngineStdout(event) {
    // defensive: ensure we have a string to split
    const raw = event && typeof event.data === 'string' ? event.data : String(event && event.data);
    const uciStringSplitted = raw.split(' ').filter(Boolean);

    if (uciStringSplitted[0] === 'uciok') {
      this.setOption('UCI_AnalyseMode', 'true');
      this.setOption('Analysis Contempt', 'Off');

      this.stockfish.postMessage('ucinewgame');
      this.stockfish.postMessage('isready');
      return;
    }

    if (uciStringSplitted[0] === 'readyok') {
      this.stockfish.postMessage('go movetime 1500');
      return;
    }

    if (uciStringSplitted[0] === 'bestmove' && uciStringSplitted[1]) {
      if (uciStringSplitted[1] !== this.bestMove) {
        this.bestMove = uciStringSplitted[1];
        if (this.boardApi && this.boardApi.getTurnColor && this.boardApi.getTurnColor() === 'black') {
          this.boardApi.move({
            from: this.bestMove.slice(0, 2),
            to: this.bestMove.slice(2, 4),
          });
        }
      }
    }
  }

  setOption(name, value) {
    this.stockfish.postMessage(`setoption name ${name} value ${value}`);
  }

  sendPosition(position) {
    // if position is empty, send startpos without moves
    if (position && position.trim().length) {
      this.stockfish.postMessage(`position startpos moves ${position}`);
    } else {
      this.stockfish.postMessage('position startpos');
    }
    this.stockfish.postMessage('go movetime 2000');
  }
}