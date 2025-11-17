<template>
  <div class="flex flex-col gap-20 items-center py-10 w-full min-h-screen bg-[#f6f6f8]">
    <div class="flex flex-col items-center gap-4 mx-4">
      <h1 class="text-3xl  lg:text-6xl text-center font-bold text-black">Master the Game of Kings</h1>
      <p class=" text-md lg:text-lg text-center  text-black">Step into the world of chess strategy. Master the foundations and uncover the deeper tactics that shape the game</p>
     
      <div class="w-auto h-auto border-2 rounded-xl border-black p-1 md:p-3 mt-6">

      
      <TheChessboard 
        :config="boardConfig" 
        @board-created="(ev)=>{boardCreated(ev);}"
        class=" !w-64 !h-64 lg:!w-96 lg:!h-96  rounded-lg shadow-lg " />

      </div>
      <p class="text-black text-center text-sm lg:text-lg">{{ game_name }}</p>
    </div>
    <div class="flex flex-col items-center gap-3">
        <h2 class="text-3xl lg:text-4xl font-medium text-black text-center">Explore Our Learning Modules</h2>
        <p class="font-normal text-slate-400 text-sm lg:text-lg text-center">Start with the basics or learn with solving puzzles</p>
      <div class="grid grid-cols-1 lg:grid-cols-3 mx-5 lg:mx-32 gap-y-5 lg:gap-x-5">
        <div class="flex flex-col justify-between items-start p-6 gap-6 w-auto shadow-lg bg-white rounded-xl border-2 border-gray-200" v-for="item in cards">
          
          <div class="flex flex-col">
           
              <img :src="item.image_url" alt="" class="w-16 h-16">

           <p class="text-black text-xl font-semibold mt-3">{{ item.title }}</p>
            <p class="text-black font-normal text-md text-gray-600 mt-3">{{ item.description }}</p>
          </div>
          <Button
          @click="()=>{
            $router.push(item.button_url)
          }"
          class="!bg-transparent transition-colors duration-200 !font-medium !text-blue-500 !border-none !rounded-md hover:bg-blue-300 hover:text-white !p-0">{{ item.button_label }} </Button>
        </div>
      </div>
      </div>

    <div class="flex flex-col items-center gap-3">
        <h2 class="text-3xl lg:text-4xl font-medium text-black text-center">Test Your Skills</h2>
        <p class="font-normal text-slate-400 text-sm lg:text-lg text-center">Apply your knowledge with Puzzles and Battle against Stockfish</p>
     <div class="grid grid-cols-1 lg:grid-cols-2 mx-5 lg:mx-32 gap-y-5 lg:gap-x-5">
        <div class="flex flex-col justify-between items-start p-6  w-auto shadow-lg bg-white rounded-xl border-2 border-gray-200" v-for="item in skills">
          <img :src="item.image_url" alt="" class="w-16 h-auto">
          <div class="flex flex-col">

            <p class="text-black text-xl font-semibold mt-3">{{ item.title }}</p>
            <p class="text-black font-normal text-md text-gray-600 mt-3">{{ item.description }}</p>
          </div>
          <Button 
          @click="()=>{
            $router.push(item.button_url)
          }"
          class="!bg-transparent !p-0 !mt-3 transition-colors duration-200 !font-medium !text-blue-500 !border-none !rounded-md hover:bg-blue-300 hover:text-white">{{ item.button_label }}</Button>
        </div>
      </div>
      </div>
      </div>
</template>
<script setup>
import { TheChessboard } from "vue3-chessboard";
import { Chess } from "chess.js";
import "vue3-chessboard/style.css";
let boardApi;
const base = useRuntimeConfig().app.baseURL
const cards = ref([
  {
    image_url: `${base}/icons/rook_piece.png`,
    title: 'The Chess Piece Movement Guide',
    description: 'Learn how each piece moves, captures, and controls the board. The essential first step for any new player.',
    button_label : 'View Guide',
    button_url : {
      name:'learn',
    }
  },
  {
    image_url: `${base}/icons/strategy.png`,
    title: 'Mastering the Endgame',
    description: 'Understand the critical concepts of Checkmate, Stalemate, Draws, and when to Resign.',
     button_label : 'Explore Concepts',
      button_url : {
      name:'learn',
      query: { scrollTo : 'endgame'}
    }
  },
  {
    image_url: `${base}/icons/book.png`,
    title: 'Top 6 Chess Openings',
    description: 'Explore the most popular and effective openings to start your games with confidence.',
     button_label : 'Learn Openings',
      button_url : {
      name:'learn',
      query: { scrollTo : 'openings'}
    }
  },
])

const skills= ref([
  {
    image_url:`${base}/icons/puzzle.png`,
    title:'Chess Puzzles',
    description:'Sharpen your tactical skills with puzzles ranging from beginner to advanced levels.',
    button_label : 'Solve Puzzles',
    button_url : '/puzzles'
  },
  {
    image_url:`${base}/icons/bot.png`,
    title:'Play Against Stockfish',
    description:'Practice against computer opponent Stockfish to improve your game.',
    button_label : 'Play a Game',
    button_url : '/play'
  },
])

const boardConfig = ref({
  viewOnly:true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
})



const game = new Chess();
const fen = ref(game.fen());
let interval = null;
let game_name = ref('')

const classic_checkmate_games = [
  {
    game_name: "Donald Byrne vs Bobby Fischer (1956) — Game of the Century",
    moves: [
      "Nf3","Nf6","c4","g6","Nc3","Bg7","d4","O-O","Bf4","d5",
      "Qb3","dxc4","Qxc4","c6","e4","Nbd7","Rd1","Nb6","Qc5","Bg4",
      "Bg5","Na4","Qa3","Nxc3","bxc3","Nxe4","Bxe7","Qb6","Bxf8","Bxf8",
      "Qb3","Nxc3","Bc4","Re8+","Kf1","Qxb3","Bxb3","Nxd1","Bxd1","Bb4",
      "g3","Bh3+","Kg1","c5","d5","c4","Ba4","Re2","Bd1","Rxa2",
      "Ng5","Bc5","Nxh3","c3","Kg2","c2","Bf3","Ba3","Be4","c1=Q",
      "Rxc1","Bxc1","d6","Rd2","Bxb7","a5","Bc6","Rxd6","Ba4","Rd4",
      "Bb3","a4","Ba2","Rd2","Bc4","a3","Ng5","a2","Bxf7+","Kf8",
      "Bxa2","Rxa2","Nxh7+","Kg7","Ng5","Bxg5","h4","Be3","Kf3","Bxf2",
      "Kg4","Ra3","Kf4","Bxg3+","Kg4","Be5","h5","Rg3+","Kh4","g5#"
    ]
  },
  {
    game_name: "Adolf Anderssen vs Lionel Kieseritzky (1851) — The Immortal Game",
    moves: [
      "e4","e5","f4","exf4","Bc4","Qh4+","Kf1","b5","Bxb5","Nf6",
      "Nf3","Qh6","d3","Nh5","Nh4","Qg5","Nf5","c6","g4","Nf6",
      "Rg1","cxb5","h4","Qg6","h5","Qg5","Qf3","Ng8","Bxf4","Qf6",
      "Nc3","Bc5","Nd5","Qxb2","Bd6","Bxg1","e5","Qxa1+","Ke2","Na6",
      "Nxg7+","Kd8","Qf6+","Nxf6","Be7#"
    ]
  },
  {
    game_name: "Paul Morphy vs Duke Karl / Count Isouard (1858) — The Opera Game",
    moves: [
      "e4","e5","Nf3","d6","d4","Bg4","dxe5","Bxf3","Qxf3","dxe5",
      "Bc4","Nf6","Qb3","Qe7","Nc3","c6","Bg5","b5","Nxb5","cxb5",
      "Bxb5+","Nbd7","O-O-O","Rd8","Rxd7","Rxd7","Rd1","Qe6","Bxd7+","Nxd7",
      "Qb8+","Nxb8","Rd8#"
    ]
  },
  {
    game_name: "José Raúl Capablanca vs Charles Jaffe (1910) — New York Simul",
    moves: [
      "d4","d5","Nf3","Nf6","c4","e6","Nc3","Be7","Bg5","O-O",
      "e3","b6","Bd3","Bb7","O-O","Nbd7","Rc1","c5","cxd5","Nxd5",
      "Bxe7","Qxe7","Nxd5","Bxd5","a3","Rac8","Ba6","Rc7","b4","c4",
      "Nd2","Nb8","Bxc4","Rfc8","Qe2","Bxc4","Rxc4","Rxc4","Nxc4","Qc7",
      "Ne5","Qc2","Qf3","f6","Ng4","Qf5","Qb7","Rf8","h3","h5",
      "Nh2","Qd5","Qxa7","Nc6","Qxb6","Rb8","Qc5","Qa2","Qxc6","Qxa3",
      "Qxe6+","Kh8","Nf3","Qxb4","Qf5","Qe7","Qxh5+","Kg8","Nh4","Qf7",
      "Ng6","Qe8","Rc1","Rb7","Rc8","Qxc8","Qh8+","Kf7","Qxc8","Rb1+",
      "Kh2","Kxg6","Qg4+","Kf7","Qd7+","Kg6","f4","Re1","f5+","Kh6",
      "Qf7","Kh7","Qg6+","Kh8","Qe8+","Kh7","Qh5+","Kg8","Qe8+","Kh7",
      "Ng6","Kh6","Qh8+","Kg5","h4+","Kxf5","Qh5+","Ke6","Nf4+","Kd6",
      "Qd5+","Kc7","Ne6+","Kc8","Qc6+","Kb8","Qc7+","Ka8","Nc5","Rh1+",
      "Kxh1","g5","Qb7#"
    ]
  },
  {
    game_name: "Garry Kasparov vs Veselin Topalov (1999) — Wijk aan Zee, The Immortal Kasparov",
    moves: [
      "e4","d6","d4","Nf6","Nc3","g6","Be3","Bg7","Qd2","c6",
      "f3","b5","Nge2","Nbd7","Bh6","Bxh6","Qxh6","Bb7","a3","e5",
      "O-O-O","Qe7","Kb1","a6","Nc1","O-O-O","Nb3","exd4","Rxd4","c5",
      "Rd1","Nb6","g3","Kb8","Na5","Ba8","Bh3","d5","Qf4+","Ka7",
      "Rhe1","d4","Nd5","Nbxd5","exd5","Qd6","Rxd4","cxd4","Re7+","Kb6",
      "Qxd4+","Kxa5","b4+","Ka4","Qxc3","Qd1+","Kb2","Qd4+","Qxd4","Rxd4",
      "Ra7","Bb7","Rxb7","Rd1+","Kb2","Ra1","Kxa1","Kxa3","Ra7","Kxb4",
      "Rxa6","Kc3","Rc6+","Kd2","b6","Nd5","Rc5","Nc3+","Kb2","Na4+",
      "Kc1","Nc3","b7","Ne2+","Kb2","Rb4+","Ka1","Ra4+","Kb1","Nc3+",
      "Kc1","Ra1+","Kb2","Rb1+","Ka3","Kc2","b8=Q","Ra1#"
    ]
  }
];

const game_idx = ref(0)
const idx = ref(0)


function makeRandomMove() {
  let current_game = classic_checkmate_games.at(game_idx.value)
  let moves = current_game.moves
  let move = moves.at(idx.value)
  boardApi?.move(move)
  if(game.turn()=='w'){
    game.setTurn("b")
  }else{
    game.setTurn("w")
  }
  idx.value=idx.value+1
}

onMounted(() => {
  console.log(useAppConfig())
  game_idx.value = Math.random()*classic_checkmate_games.length
  game_name.value = classic_checkmate_games.at(game_idx.value).game_name
});

function boardCreated(ev){
  boardApi = ev
  interval = setInterval(makeRandomMove, 1000);
}

onBeforeUnmount(() => {
  clearInterval(interval);
});

</script>
