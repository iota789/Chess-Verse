<template>
  <div  class="grid grid-cols-1 lg:grid-cols-[70%_30%] min-h-screen w-full p-4 md:px-10 md:py-5 bg-[#f6f6f8] gap-6">
    
    <!-- Chessboard Container -->
    <div class="flex flex-col gap-4 bg-white border-[0.063rem] p-6 border-gray-200 shadow-2xl rounded-3xl h-min mx-auto w-full max-w-xl">

      <div class="flex flex-row justify-between items-center mx-auto w-full max-w-[500px]">
        <div class="flex flex-row gap-4 ">
          <Tag class="font-semibold"
          v-if="selectedDifficulty!=''"
          :class="{
            '!bg-red-500 !text-white': selectedDifficulty== 'hard',
            '!bg-green-500 !text-white': selectedDifficulty== 'easy',
            '!bg-yellow-500 !text-white':selectedDifficulty== 'medium',

          }"
          ><i class="pi pi-gauge"></i>{{ formatDifficulty(selectedDifficulty) }}</Tag>
          <Tag 
          v-if="selectedGameType!=''"
          class="!bg-purple-500 !text-white" ><i class="pi pi-hashtag"></i>{{ formatDifficulty(selectedGameType) }}</Tag>
        </div>
 <button class="bg-white border border-gray-300 rounded-lg p-2 cursor-pointer" @click="showDialog=true">
            <span class="text-black flex flex-row gap-2 items-center text-sm md:text-md font-normal">
              <i class="pi pi-sliders-h"></i>
              Difficulty & Theme
            </span>
          </button>
      </div>
      <TheChessboard
        @board-created="onBoardCreated"
        :board-config="boardConfig"
        @move="handleMove"
         class="!w-full !aspect-square  !max-w-[500px] !mx-auto"
      />
    </div>

    <!-- Right Side Panel -->
    <div class="flex flex-col gap-6 w-full max-w-xl mx-auto lg:max-w-none">
      <!-- Timer Card -->
      <div class="bg-white px-4 py-6 md:px-6 md:py-9 rounded-xl w-full border border-gray-200 shadow-sm flex flex-row justify-between items-center gap-4">
          <p class="text-lg md:text-xl font-medium text-black">Time </p>
          <p class="text-xl md:text-2xl text-black">
            <i class="pi pi-stopwatch text-blue-500 text-xl md:text-2xl mr-2"></i>
            {{ formatTime }}
          </p>
      </div>
  
      <!-- Puzzle Status Card -->
      <div class="bg-white px-4 py-4 md:px-6 md:py-6 rounded-xl w-full border border-gray-200 shadow-sm">
        <div class="flex flex-row justify-between items-center">
          <h3 class="text-[#111218] text-base md:text-lg font-bold leading-tight tracking-[-0.015em] pb-2 my-4 md:my-6">Puzzle Status</h3>
          <button class="bg-white border border-gray-300 rounded-lg p-2 cursor-pointer" @click="showDialog=true">
            <span class="text-black flex flex-row gap-2 items-center text-sm md:text-md font-normal">
              <i class="pi pi-sliders-h"></i>
              Options
            </span>
          </button>
        </div>

        <p class="text-[#616889] text-sm font-normal leading-normal pb-4 pt-1">Make your move on the board to see the result.</p>
        
        <!-- Feedback Messages -->
        <div class="flex items-center justify-center gap-3 p-3 rounded-lg"
         :class="{
            'bg-green-500 text-white': message.type=='success',
            'bg-yellow-300 text-white': message.type=='warning',
            'bg-red-500 text-white': message.type=='error',
            'bg-blue-500 text-white text-center': message.type=='hint',
            'bg-gray-300 text-gray-700': message.type=='info',
          }"
        id="feedback-initial">
          <span class="text-sm font-medium "
          
          >
          <i class="pi pi-sparkles text-white mr-3" v-if="message.type=='hint'"></i>{{ message.text }}</span>
        </div>
        
        <!-- Buttons -->
        <div class="mt-6 flex flex-col gap-3">
          <button @click="loadFen"
            class="flex w-full cursor-pointer items-center justify-center rounded-lg py-2.5 px-4 bg-blue-600 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">
            <span class="truncate">Next Puzzle</span>
          </button>
          
          <button @click="generateHint"
            class="flex w-full cursor-pointer items-center justify-center border border-blue-500 rounded-lg py-2.5 px-4 bg-white text-blue-500 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-50 focus:ring-4 focus:ring-blue-100">
            <span class="truncate"><i class="pi pi-sparkles"></i> Hint</span>
          </button>
          
          <button @click="boardApi.undoLastMove()"
            class="flex w-full cursor-pointer items-center justify-center rounded-lg py-2.5 px-4 bg-[#f0f1f4] text-[#111218] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-200">
            <span class="truncate">
              <i class="pi pi-undo text-black"></i>
              Try Again
            </span>
          </button>
        </div>
      </div>
    </div>
</div>
  <div v-if="showCompletionDialog" class="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
      
      <div class="w-full flex flex-col gap-7 justify-center items-center">
        <div class="flex flex-col items-center">
           <DotLottieVue style="height: 200px; width: 1500px" autoplay loop src="animation/Success.lottie" />

          <p class="text-2xl font-bold text-black text-center" >Puzzle Solved!!</p>
          <p class="text-md font-bold text-gray-800 mt-3" >Great job on finding the right move</p>
        </div>
          <Rating v-model="rating" class="w- " :stars="3"
        :pt="{offIcon:{class:'!w-10 !h-10 !text-blue-500'},onIcon:{class:'!w-10 !h-10 !text-blue-500'}}"
        >
        
        </Rating>
        <Button class="!bg-blue-500 !text-white w-full" @click="()=>{loadFen(); showCompletionDialog=false; resetTimer();}">
          Next Puzzle <i class="pi pi-arrow-right" ></i>
        </Button>
      </div>
    </div>

  </div>
<div v-if="showDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
  <div class="w-full max-w-md bg-white  rounded-xl shadow-lg p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-gray-900 ">Filter Puzzles</h2>
<button class="text-gray-400 hover:text-gray-600 ">
</button>
</div>
<div class="space-y-6">
<div>
<h3 class="text-base font-semibold text-gray-700  mb-3">Difficulty</h3>
<div class="grid grid-cols-3 gap-3">
  <div  :class="{'!bg-blue-500 text-white !border-blue-400':selectedDifficulty=='easy'}" @click="()=>{selectedDifficulty='easy'; selectedGameType='';}"  
  class="flex items-center justify-center text-center p-3 text-sm font-medium text-gray-900  bg-gray-100  rounded-lg border border-gray-200  cursor-pointer ">
    <p>Easy</p>
  </div>
  <div  :class="{'!bg-blue-500 text-white !border-blue-400':(selectedDifficulty=='medium')}" @click="()=>{selectedDifficulty='medium'; selectedGameType='';}"  
  class="flex items-center justify-center text-center p-3 text-sm font-medium text-gray-900  bg-gray-100  rounded-lg border border-gray-200  cursor-pointer ">
    <p>Medium</p>
  </div>
  <div  :class="{'!bg-blue-500 text-white !border-blue-400':selectedDifficulty=='hard'}" @click="()=>{selectedDifficulty='hard'; selectedGameType='';}"  
  class="flex items-center justify-center text-center p-3 text-sm font-medium text-gray-900  bg-gray-100  rounded-lg border border-gray-200  cursor-pointer ">
    <p>Hard</p>
  </div>


</div>
</div>
<div>
<h3 class="text-base font-semibold text-gray-700 0 mb-3">Theme of the game</h3>
 <select
      id="difficulty"
      v-model="selectedGameType"
      class="appearance-none w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-8"
    >
      <option
        v-for="(option, index) in computedDifficulty"
        class="text-black "
        :key="index"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
</div>
</div>
<div class="mt-8 flex justify-end gap-3">
<button
@click="()=>{selectedDifficulty=''; selectedGameType =''; showDialog = false; loadFen()}"
class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f1f4]  text-[#111218]  text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-200 ">
<span class="truncate">Cancel</span>
</button>
<button :class="{'pointer-events-none opacity-45':selectedDifficulty==''&&selectedGameType==''}"
@click="()=>{
  stopTimer();
  loadFen();
  showDialog=false
}"
 class="flex min-w-[84px] max-w-[480px] bg-blue-500 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90">
<span class="truncate"
>Apply Filters</span>
</button>
</div>
</div>
</div>
<!-- <p>{{ generateHint }}</p> -->

</template>

<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { ref } from "vue";
import { TheChessboard } from "vue3-chessboard";
import { Chess } from "chess.js";
import "vue3-chessboard/style.css";
import { filter } from '@primeuix/themes/aura/datatable';
const showDialog = ref(false)
const showCompletionDialog = ref(false)
const pageRef = ref(null)
const seconds = ref(0)
let timer = null
const rating = ref(2)
const gameTypes = ref([
  'Fork',
  'Pin',
  'Queen End Game',
  'Rook End Game',
  'Mate',
  'Sacfirice',
  'Advantage'
])
const message = ref({
  text:'Welcome',
  type: 'info'
})
const selectedGameType = ref('')
const puzzles = ref(
  [{"puzzleid":"EijzN","fen":"6k1/pb1r1ppp/1p2q3/8/2p2B2/PP4P1/2Q4P/2R3K1 b - - 1 28","rating":799,"ratingdeviation":90,"moves":["c4b3","c2c8","b7c8","c1c8","d7d8","c8d8","e6e8","d8e8"],"themes":["backRankMate","endgame","mate","mateIn4","sacrifice","veryLong"]},{"puzzleid":"daeEu","fen":"6k1/1b3ppp/2p2n2/1B6/n2qP3/5P2/2Q3PP/2R4K b - - 0 28","rating":720,"ratingdeviation":91,"moves":["c6b5","c2c8","b7c8","c1c8","d4d8","c8d8","f6e8","d8e8"],"themes":["backRankMate","endgame","mate","mateIn4","sacrifice","veryLong"]},{"puzzleid":"kME0S","fen":"4b1k1/1pp3pp/1p2p3/r3P1B1/1R6/8/2P2PPP/3Q2K1 w - - 1 25","rating":837,"ratingdeviation":100,"moves":["d1d8","a5a1","b4b1","a1b1","g5c1","b1c1","d8d1","c1d1"],"themes":["backRankMate","endgame","mate","mateIn4","veryLong"]},{"puzzleid":"zhzE4","fen":"k7/pp4R1/1n4p1/8/1b3B2/2r2P1P/6PK/4r3 b - - 5 36","rating":731,"ratingdeviation":95,"moves":["b6d5","g7g8","b4f8","g8f8","e1e8","f8e8","c3c8","e8c8"],"themes":["backRankMate","endgame","mate","mateIn4","veryLong"]},{"puzzleid":"WNZhp","fen":"7k/p5pp/3p1b2/4pP1P/8/3N1Q2/q5PK/1r6 b - - 4 31","rating":689,"ratingdeviation":96,"moves":["a2a4","f3a8","b1b8","a8b8","f6d8","b8d8","a4e8","d8e8"],"themes":["backRankMate","endgame","mate","mateIn4","veryLong"]},{"puzzleid":"dUEFw","fen":"6k1/pb3ppp/4pnq1/8/6PR/5PQ1/PPrr3P/5RK1 b - - 2 26","rating":859,"ratingdeviation":91,"moves":["c2b2","g3b8","b7c8","b8c8","d2d8","c8d8","f6e8","d8e8"],"themes":["mate","mateIn4","middlegame","veryLong"]},{"puzzleid":"eIV39","fen":"7k/6p1/b5Pp/6b1/q7/5pQ1/1PP3R1/1K6 b - - 1 37","rating":767,"ratingdeviation":83,"moves":["f3g2","g3b8","a6c8","b8c8","g5d8","c8d8","a4e8","d8e8"],"themes":["endgame","mate","mateIn4","veryLong"]},{"puzzleid":"71BAC","fen":"7k/p5pp/8/1R1p1b2/8/K1B3PP/3prq2/8 b - - 0 46","rating":833,"ratingdeviation":91,"moves":["d2d1q","b5b8","f5c8","b8c8","e2e8","c8e8","f2f8","e8f8"],"themes":["endgame","mate","mateIn4","veryLong"]},{"puzzleid":"YNhRC","fen":"1rb5/2p3pk/p1p4p/4N3/8/B1P1qQ2/P1PP1PPP/4R1K1 w - - 0 21","rating":888,"ratingdeviation":150,"moves":["e1e3","b8b1","a3c1","b1c1","f3d1","c1d1","e3e1","d1e1"],"themes":["backRankMate","endgame","mate","mateIn4","veryLong"]},{"puzzleid":"Kt7f7","fen":"3r1rk1/2p3p1/p6p/1p6/1P1q1Pn1/2B3Pb/P1B4P/3RQ2K b - - 5 31","rating":1118,"ratingdeviation":390,"moves":["d4f2","e1e6","g8h8","c3g7","h8g7","e6g6","g7h8","g6h7"],"themes":["attraction","kingsideAttack","mate","mateIn4","middlegame","sacrifice","veryLong"]},{"puzzleid":"Z1KFi","fen":"2r4k/1p5p/pn3r2/3pQ1pB/3Pp3/4P1Pb/PP3qNP/2R2RK1 w - - 0 27","rating":734,"ratingdeviation":81,"moves":["f1f2","c8c1","h5d1","c1d1","g2e1","d1e1","f2f1","e1f1"],"themes":["hangingPiece","kingsideAttack","mate","mateIn4","middlegame","veryLong"]},{"puzzleid":"zxWSJ","fen":"2R5/pB3p1p/1p3k2/4bp2/8/5Q2/r4PPP/4R1K1 w - - 2 26","rating":820,"ratingdeviation":81,"moves":["e1e5","a2a1","c8c1","a1c1","f3d1","c1d1","e5e1","d1e1"],"themes":["backRankMate","endgame","mate","mateIn4","veryLong"]},{"puzzleid":"GpHSb","fen":"3r2k1/4rppp/3N4/1p1n1b2/8/1P6/1K3PPP/R7 b - - 5 28","rating":723,"ratingdeviation":113,"moves":["d8d6","a1a8","f5c8","a8c8","d6d8","c8d8","e7e8","d8e8"],"themes":["backRankMate","endgame","fork","mate","mateIn4","veryLong"]},{"puzzleid":"kzMoL","fen":"1b3r1k/5Npp/pq6/1p3b2/1P3p2/P6P/B2RrPP1/3R2K1 b - - 1 31","rating":831,"ratingdeviation":84,"moves":["f8f7","d2d8","b6d8","d1d8","e2e8","d8e8","f7f8","e8f8"],"themes":["backRankMate","fork","mate","mateIn4","middlegame","veryLong"]},{"puzzleid":"15zqy","fen":"6rk/pp3r1P/3pq3/2p1n3/4Pp1Q/2PP2p1/PP6/2K4R b - - 0 35","rating":694,"ratingdeviation":91,"moves":["g8g7","h4d8","e6e8","d8e8","f7f8","e8f8","g7g8","h7g8q"],"themes":["advancedPawn","doubleCheck","endgame","exposedKing","kingsideAttack","mate","mateIn4","promotion","veryLong"]},{"puzzleid":"e6eG8","fen":"8/8/8/1p1p4/1P1P4/P6k/7p/7K w - - 2 53","rating":858,"ratingdeviation":124,"moves":["a3a4","b5a4","b4b5","a4a3","b5b6","a3a2","b6b7","a2a1q"],"themes":["advancedPawn","endgame","mate","mateIn4","pawnEndgame","promotion","veryLong"]},{"puzzleid":"FcLsp","fen":"6rk/3q1p2/2p3pp/2P5/1PQ5/4pPB1/r5PP/3R3K w - - 0 35","rating":849,"ratingdeviation":106,"moves":["d1d7","a2a1","d7d1","a1d1","g3e1","d1e1","c4f1","e1f1"],"themes":["backRankMate","endgame","mate","mateIn4","veryLong"]},{"puzzleid":"7YPVk","fen":"6k1/p1q4p/1p3QpB/2rp1r2/3p4/1B1P2R1/PP4PP/7K w - - 0 28","rating":716,"ratingdeviation":99,"moves":["f6f5","c5c1","h6c1","c7c1","b3d1","c1d1","f5f1","d1f1"],"themes":["endgame","mate","mateIn4","sacrifice","veryLong"]},{"puzzleid":"BztZy","fen":"3r2k1/p1p2ppp/4p3/2q2n2/5QP1/2P2R2/PP1r3P/5R1K b - - 0 29","rating":839,"ratingdeviation":101,"moves":["f5h4","f4f7","g8h8","f7f8","d8f8","f3f8","c5f8","f1f8"],"themes":["backRankMate","mate","mateIn4","middlegame","sacrifice","veryLong"]},{"puzzleid":"4fbFK","fen":"3rr1k1/pppq1p1p/2n2Pp1/4p3/4P3/2P2R2/PPB3PP/RN2Q2K w - - 1 19","rating":787,"ratingdeviation":120,"moves":["e1h4","d7d1","c2d1","d8d1","h4e1","d1e1","f3f1","e1f1"],"themes":["backRankMate","mate","mateIn4","middlegame","sacrifice","veryLong"]},{"puzzleid":"ZFn0n","fen":"1R6/6bk/p2p3p/5P2/4P3/p1p2P2/P7/K1r4R w - - 1 34","rating":836,"ratingdeviation":88,"moves":["h1c1","c3c2","f5f6","g7f6","e4e5","f6e5","b8b2","a3b2"],"themes":["advancedPawn","discoveredAttack","endgame","mate","mateIn4","veryLong"]},{"puzzleid":"pzCxb","fen":"2r4k/4q2p/1p1P1p2/pP6/6Q1/5N2/2r2PPP/7K w - - 0 33","rating":790,"ratingdeviation":85,"moves":["d6e7","c2c1","f3g1","c1g1","h1g1","c8c1","g4d1","c1d1"],"themes":["attraction","backRankMate","endgame","mate","mateIn4","sacrifice","veryLong"]},{"puzzleid":"NzCrU","fen":"5bk1/5p1p/2B2pp1/3P4/2N2N2/8/1r3rPP/5RK1 w - - 0 31","rating":1039,"ratingdeviation":270,"moves":["f1f2","b2b1","f2f1","f8c5","c4e3","c5e3","g1h1","b1f1"],"themes":["backRankMate","endgame","mate","mateIn4","veryLong"]},{"puzzleid":"yGAbY","fen":"6k1/4bpp1/1Pq1p2p/3pP3/1P6/r2b1Q2/3N1PPP/2R3K1 w - - 0 24","rating":1040,"ratingdeviation":280,"moves":["c1c6","a3a1","d2b1","a1b1","c6c1","b1c1","f3d1","c1d1"],"themes":["backRankMate","endgame","mate","mateIn4","veryLong"]},{"puzzleid":"zxmap","fen":"3R4/p1N2pqk/7p/2Q2p2/7N/8/P3rPPP/4R1K1 w - - 1 27","rating":861,"ratingdeviation":97,"moves":["e1e2","g7a1","c5c1","a1c1","d8d1","c1d1","e2e1","d1e1"],"themes":["endgame","fork","mate","mateIn4","veryLong"]},
   {"puzzleid":"n1GnQ","fen":"5b2/1p3ppk/2q4p/p4Q2/8/1P2B2P/5PP1/6K1 b - - 4 39","rating":1559,"ratingdeviation":79,"moves":["g7g6","f5f7","f8g7","e3d4","c6c1","g1h2","c1f4","f7f4"],"themes":["crushing","endgame","fork","pin","veryLong"]},{"puzzleid":"Sj2i1","fen":"rr6/5Rp1/p1k1p1Qp/2bpP3/2p2P2/2q1P1P1/P2N1KP1/4R3 b - - 2 22","rating":1664,"ratingdeviation":238,"moves":["b8b2","g6e6","c6b5","f7b7","b5a5","b7b2","c3b2","e6d5"],"themes":["crushing","middlegame","pin","veryLong"]},{"puzzleid":"sGoW7","fen":"2r3k1/6pp/1p1Qp3/pP2Pq2/P7/7P/3R1PP1/6K1 w - - 5 35","rating":1547,"ratingdeviation":75,"moves":["d6b6","c8c1","g1h2","f5f4","g2g3","f4d2","b6e6","g8f8"],"themes":["crushing","endgame","fork","pin","veryLong"]},{"puzzleid":"Mlkwn","fen":"2r4r/pp1pkp1p/2n2p2/q3p3/2Q5/2P1P3/P4PPP/R3KBNR w KQ - 1 13","rating":1437,"ratingdeviation":81,"moves":["c4b3","c6d4","b3b4","a5b4","c3b4","d4c2","e1d2","c2a1"],"themes":["advantage","fork","middlegame","pin","veryLong"]},{"puzzleid":"08UaO","fen":"r4k2/ppp3p1/2n3Qr/1q5p/1bbP2nP/4BR2/PP3P2/R5K1 b - - 5 22","rating":1427,"ratingdeviation":500,"moves":["g4f6","e3h6","g7h6","a1e1","b4e7","f3f6","e7f6","g6f6"],"themes":["equality","middlegame","pin","quietMove","veryLong"]},{"puzzleid":"8WflC","fen":"6k1/Q4ppp/3q4/3pNr2/P1pPn1P1/8/7P/4R1K1 b - - 0 36","rating":1553,"ratingdeviation":74,"moves":["f5f6","a7a8","d6f8","a8f8","g8f8","e5d7","f8e7","d7f6"],"themes":["attraction","crushing","endgame","fork","pin","veryLong"]},{"puzzleid":"WhIg5","fen":"5r1k/p6p/1p4p1/2qB4/6NQ/2P3P1/PP3rP1/4R1K1 w - - 1 28","rating":1529,"ratingdeviation":74,"moves":["g4e3","f2f1","e1f1","c5e3","g1h2","f8f1","h4d8","h8g7"],"themes":["advantage","defensiveMove","deflection","middlegame","pin","sacrifice","veryLong"]},{"puzzleid":"8tXGQ","fen":"5k2/p4b2/1p1q3p/8/2n3Q1/P1P5/5PP1/3R2K1 b - - 1 29","rating":1574,"ratingdeviation":86,"moves":["d6e6","d1d8","f8e7","g4h4","e6f6","d8d7","e7d7","h4f6"],"themes":["crushing","deflection","endgame","exposedKing","pin","veryLong"]},{"puzzleid":"x4SxI","fen":"6k1/p5pp/1pp4r/3p4/3PpPq1/4P2b/PPQ3P1/4R1KR w - - 2 30","rating":1635,"ratingdeviation":500,"moves":["h1h3","h6h3","c2c6","h3h1","g1h1","g4h4","h1g1","h4e1"],"themes":["attraction","endgame","equality","fork","pin","veryLong"]},{"puzzleid":"Cvkkb","fen":"1brr1k2/5p2/p1p1p1qN/1p6/2Pn2R1/PP5P/1Q3PP1/2B3K1 b - - 1 30","rating":1615,"ratingdeviation":135,"moves":["g6f6","g4g8","f8e7","c1g5","b8e5","g5f6","e5f6","g8d8"],"themes":["advantage","middlegame","pin","veryLong"]},{"puzzleid":"W7rQg","fen":"4r1k1/p5pp/2R2pq1/5rn1/P2P4/4P3/1Q3PPP/2R1N1K1 w - - 1 32","rating":1496,"ratingdeviation":74,"moves":["c6c8","g5h3","g1f1","f5f2","b2f2","h3f2","c8e8","g6e8"],"themes":["advantage","fork","master","middlegame","pin","veryLong"]},{"puzzleid":"mfzOz","fen":"2r3k1/1Q2ppbp/6p1/p4b2/P2P4/3n2P1/1P3PBP/4R1K1 w - - 1 24","rating":1451,"ratingdeviation":75,"moves":["e1e7","c8c1","g2f1","f5h3","e7e8","g7f8","b7g2","h3g2"],"themes":["crushing","middlegame","pin","veryLong"]},{"puzzleid":"aaQCw","fen":"r6N/p2k1BpR/nppp4/8/3p2P1/q7/P4PP1/4R1K1 b - - 0 20","rating":1408,"ratingdeviation":500,"moves":["d4d3","f7e6","d7c7","h7g7","c7b8","e6d5","a6c7","d5c6"],"themes":["equality","middlegame","pin","veryLong"]},{"puzzleid":"ER82M","fen":"4r2k/3R2p1/p4p2/7p/P1P2q2/1Q5P/1P3PP1/6K1 w - - 3 30","rating":1489,"ratingdeviation":76,"moves":["g2g3","e8e1","g1g2","f4e4","b3f3","e1g1","g2g1","e4f3"],"themes":["advantage","deflection","endgame","pin","veryLong"]},{"puzzleid":"SITQ5","fen":"r3k2r/pbp1pp2/1p3npp/8/2B1P2B/2P5/P4PPP/R2R2K1 b kq - 0 14","rating":1550,"ratingdeviation":77,"moves":["b7e4","h4f6","e7f6","d1e1","f6f5","f2f3","e8g8","f3e4"],"themes":["advantage","middlegame","pin","veryLong"]},{"puzzleid":"nxjzO","fen":"2k5/ppp1rBpp/1b1p4/1P6/3Nn3/2P1B3/P5PP/2R3K1 w - - 1 20","rating":1567,"ratingdeviation":500,"moves":["f7d5","e4f6","e3g5","f6d5","g5e7","d5c3","g1f1","b6d4"],"themes":["capturingDefender","equality","middlegame","pin","veryLong"]},{"puzzleid":"1XXSP","fen":"2b5/1p1nq1kp/r4pp1/p1p1p3/4P3/1P1Q4/P1PR2PP/3R3K b - - 3 24","rating":1450,"ratingdeviation":79,"moves":["g7h6","d3h3","h6g7","d2d7","e7d7","d1d7","c8d7","h3d7"],"themes":["crushing","discoveredAttack","middlegame","pin","veryLong"]},{"puzzleid":"4YKZ8","fen":"1r6/p4p1p/3kb1p1/2R1p3/3np3/P6P/P2R1PP1/2B3K1 w - - 3 27","rating":1473,"ratingdeviation":76,"moves":["c5a5","b8b1","d2d1","b1c1","d1c1","d4e2","g1f1","e2c1"],"themes":["advantage","attraction","endgame","fork","pin","sacrifice","veryLong"]},{"puzzleid":"7CRzk","fen":"8/3R4/2p5/1p1kr1BP/p7/K7/3P4/3b4 b - - 2 38","rating":1497,"ratingdeviation":75,"moves":["d5c4","d2d3","c4c3","g5f6","b5b4","a3a2","c3c2","f6e5"],"themes":["advantage","endgame","pin","veryLong"]},{"puzzleid":"6hImr","fen":"r4rk1/p1pp1ppp/1p6/n1b1Pn2/5P1q/P1N1PB2/1PP2KPP/R1BQ1R2 w - - 1 12","rating":1534,"ratingdeviation":75,"moves":["f2g1","f5e3","c1e3","c5e3","g1h1","e3f4","g2g3","f4g3"],"themes":["crushing","fork","middlegame","pin","veryLong"]},{"puzzleid":"pLWA9","fen":"7k/1p3prp/5p2/p4qr1/P2QR3/6PR/1P5P/6K1 b - - 0 28","rating":1665,"ratingdeviation":189,"moves":["f5h3","e4e8","g7g8","d4f6","g5g7","e8g8","h8g8","f6d8"],"themes":["attraction","backRankMate","endgame","mate","mateIn4","pin","veryLong"]},{"puzzleid":"UvGAB","fen":"rnbqk1nr/pp3ppp/3bp3/2p1N3/3pPB2/2PP4/PP3PPP/RN1QKB1R b KQkq - 3 6","rating":1465,"ratingdeviation":74,"moves":["f7f6","d1h5","g7g6","e5g6","h7g6","h5h8","d6f4","h8g8"],"themes":["advantage","opening","pin","trappedPiece","veryLong"]},{"puzzleid":"Z2vo3","fen":"r1br2k1/pp3B2/4pP2/3pn2p/3q4/P4Q2/1P1B1PPP/R4RK1 b - - 0 20","rating":1550,"ratingdeviation":75,"moves":["g8f7","f3h5","e5g6","h5h7","f7f6","d2c3","d4c3","b2c3"],"themes":["crushing","middlegame","pin","veryLong"]},{"puzzleid":"RwfNR","fen":"3r2k1/1p2p1bp/p2q2p1/2rPpp2/1P6/3Q1P1P/P3BPP1/3RR1K1 b - - 0 22","rating":1499,"ratingdeviation":86,"moves":["c5d5","d3d5","d6d5","d1d5","d8d5","e2c4","e7e6","c4d5"],"themes":["advantage","attraction","middlegame","pin","veryLong"]},{"puzzleid":"I9EUb","fen":"1b1r2k1/4q1pp/p1p1p3/1p2P3/2P3P1/1P2Q3/PB5P/5RK1 w - - 0 26","rating":1487,"ratingdeviation":74,"moves":["b2d4","d8d4","e3d4","b8a7","c4c5","a7c5","d4c5","e7c5"],"themes":["crushing","endgame","pin","sacrifice","veryLong"]},
   {"puzzleid":"RUWjd","fen":"2r3k1/5qp1/5p1p/1pB2P1N/pp5P/6Q1/P2n2P1/4R2K w - - 4 38","rating":2154,"ratingdeviation":78,"moves":["e1e7","f7e7","c5e7","c8c1","h1h2","d2f1","h2h3","f1g3"],"themes":["crushing","fork","middlegame","sacrifice","veryLong"]},{"puzzleid":"BGQ2k","fen":"1r6/1q3rkp/p5p1/1p6/4N3/1Q1P4/P4PPP/2R4K b - - 0 29","rating":2155,"ratingdeviation":75,"moves":["b8c8","c1c8","b7c8","b3f7","g7f7","e4d6","f7e6","d6c8"],"themes":["advantage","attraction","endgame","fork","sacrifice","veryLong"]},{"puzzleid":"l4RVP","fen":"7r/1p1q1pk1/p2bp1p1/3P3p/P3Q3/1P4P1/3B1PK1/2R5 b - - 0 28","rating":2216,"ratingdeviation":73,"moves":["h8c8","d5e6","f7e6","c1c8","d7c8","e4d4","g7f7","d4d6"],"themes":["crushing","endgame","fork","veryLong"]},{"puzzleid":"pBBMD","fen":"r2k1r2/7p/3pb1p1/2qN2Pn/2B1P2P/pP6/P2Q4/1K4RR w - - 3 28","rating":2179,"ratingdeviation":112,"moves":["e4e5","f8f2","d2e3","e6d5","e3c5","d5e4","b1a1","d6c5"],"themes":["advantage","fork","intermezzo","middlegame","sacrifice","veryLong"]},{"puzzleid":"WMfML","fen":"q3k2r/pbr1bpp1/1p3n1p/2p1pB2/2N4B/2P1P3/PP2QPPP/1K1R3R w k - 4 16","rating":2182,"ratingdeviation":144,"moves":["c4e5","b7e4","f5e4","a8e4","e2d3","e4h4","d3b5","e8f8"],"themes":["advantage","defensiveMove","fork","middlegame","veryLong"]},{"puzzleid":"zhpcL","fen":"4r3/4Pp1P/8/N3R3/1kpn2P1/3p4/5K2/8 w - - 1 44","rating":2216,"ratingdeviation":83,"moves":["f2e3","d3d2","e3d2","d4f3","d2c2","f3e5","a5b7","e5g6"],"themes":["advancedPawn","attraction","crushing","endgame","exposedKing","fork","veryLong"]},{"puzzleid":"1T01l","fen":"6k1/pb1q2b1/1p4p1/2p1r3/3pN1P1/3PBQ2/PPP3B1/5RK1 b - - 0 26","rating":2279,"ratingdeviation":76,"moves":["d4e3","e4f6","g7f6","f3f6","d7g7","f6g7","g8g7","g2b7"],"themes":["crushing","exposedKing","fork","middlegame","veryLong"]},{"puzzleid":"mcC6K","fen":"5k2/pp1b2p1/2p1p2P/8/3Pq3/4B1Q1/PP4P1/6K1 b - - 0 27","rating":2286,"ratingdeviation":118,"moves":["e4b1","g1h2","b1h7","g3d6","f8e8","d6b8","e8e7","e3g5"],"themes":["crushing","defensiveMove","endgame","fork","veryLong"]},{"puzzleid":"Tj3t0","fen":"7k/8/1p4PP/2p4R/P3pK2/8/1P1p1n2/8 w - - 0 48","rating":2283,"ratingdeviation":84,"moves":["h5e5","f2d3","f4e3","d3e5","e3d2","e5c4","d2c2","e4e3"],"themes":["crushing","endgame","fork","master","veryLong"]},{"puzzleid":"hH6p4","fen":"r5k1/1pN2p1p/1p1p1qp1/2n2b2/5P2/P1P5/1P2Q1PP/4R1K1 b - - 0 20","rating":2275,"ratingdeviation":77,"moves":["a8a4","e2e8","g8g7","e8a4","c5a4","c7e8","g7f8","e8f6"],"themes":["advantage","fork","middlegame","sacrifice","veryLong"]},{"puzzleid":"PQ0gI","fen":"8/pp3k2/2p2p2/3p2p1/2PP3q/4R1n1/PPQ3PN/5rK1 w - - 3 35","rating":2166,"ratingdeviation":75,"moves":["h2f1","h4h1","g1f2","h1f1","f2g3","f1f4","g3h3","f4h4"],"themes":["endgame","fork","mate","mateIn4","veryLong"]},{"puzzleid":"8EoZq","fen":"r5k1/5pp1/1Rp4p/2PpP3/5P2/3BP1qb/4Q1P1/6K1 w - - 2 28","rating":2197,"ratingdeviation":104,"moves":["b6b1","h3g2","e2f2","g3h3","f2g2","h3e3","g1h1","e3d3"],"themes":["crushing","endgame","fork","veryLong"]},{"puzzleid":"CJrkD","fen":"1q5k/p5p1/7p/2R3b1/3PB1br/8/PP2QP2/2R3K1 w - - 8 32","rating":2247,"ratingdeviation":79,"moves":["f2f3","b8g3","e2g2","g5e3","g1f1","h4h1","f1e2","g3g2"],"themes":["crushing","deflection","exposedKing","fork","middlegame","veryLong"]},{"puzzleid":"W4oUz","fen":"r5k1/p4p2/1pnbrnpp/1N2p3/1p2P2N/3P2B1/P4PPP/2R2RK1 b - - 3 22","rating":2258,"ratingdeviation":75,"moves":["c6d4","b5d4","e5d4","g3d6","e6d6","e4e5","d6e6","e5f6"],"themes":["advantage","fork","middlegame","veryLong"]},{"puzzleid":"oibRu","fen":"r2q1rk1/3nb1p1/6Pp/3p4/p1NP4/P2n1N1R/1PQ2P2/1K4R1 b - - 0 27","rating":2140,"ratingdeviation":111,"moves":["d5c4","c2c4","g8h8","h3h6","g7h6","g6g7","h8h7","c4d3"],"themes":["advancedPawn","crushing","fork","middlegame","sacrifice","veryLong"]},{"puzzleid":"HD2Ad","fen":"8/1p3pb1/2kp3p/8/8/RbP2N1P/2r2PP1/B5K1 b - - 4 25","rating":2177,"ratingdeviation":78,"moves":["g7c3","a1c3","c2c3","a3b3","c3b3","f3d4","c6c5","d4b3"],"themes":["advantage","attraction","endgame","fork","sacrifice","veryLong"]},{"puzzleid":"Yp8qp","fen":"2r4r/3Q1p2/pknp3p/qp2p3/4P1PP/1P1P4/P1R2P2/1KR5 b - - 15 31","rating":2307,"ratingdeviation":88,"moves":["c6a7","c2c8","h8c8","c1c8","a7c8","d7d8","b6b7","d8a5"],"themes":["crushing","deflection","fork","middlegame","skewer","veryLong"]},{"puzzleid":"DiS16","fen":"3r1rk1/1b3pp1/p3P2p/1p6/6Q1/2P1q3/PPB3PP/R4RK1 w - - 0 22","rating":2139,"ratingdeviation":88,"moves":["f1f2","f7e6","g4g3","e3f2","g3f2","f8f2","g1f2","d8d2"],"themes":["attraction","crushing","fork","middlegame","veryLong"]},{"puzzleid":"1i2ZL","fen":"r3k2r/1p3ppp/p3p1q1/1NQnb3/3P4/1P3RP1/P4PBP/6K1 b kq - 0 24","rating":2241,"ratingdeviation":80,"moves":["e5b8","c5c8","e8e7","c8b7","b8c7","b5c7","d5c7","b7c7"],"themes":["crushing","fork","middlegame","veryLong"]},{"puzzleid":"ZqDdT","fen":"r4rk1/pq2b1p1/p2p3p/5Nn1/1P2p1P1/P3B2P/5PK1/R2QR3 b - - 0 26","rating":2178,"ratingdeviation":73,"moves":["g5f3","d1d5","b7d5","f5e7","g8h7","e7d5","f3e1","a1e1"],"themes":["advantage","attraction","deflection","fork","middlegame","sacrifice","veryLong"]},{"puzzleid":"csSJ6","fen":"6r1/pp3k1p/4bn2/1P3p2/3Q4/P4PP1/2r4P/4R1K1 b - - 0 29","rating":2278,"ratingdeviation":81,"moves":["b7b6","e1e6","f7e6","d4e3","e6f7","e3b3","f7g6","b3c2"],"themes":["advantage","attraction","endgame","exposedKing","fork","sacrifice","veryLong"]},{"puzzleid":"qPgnZ","fen":"2kr2nr/pppq1ppp/2n5/8/1b1P1B2/2N2B2/PP3PPP/R2Q1RK1 b - - 0 11","rating":2219,"ratingdeviation":75,"moves":["d7d4","f3g4","c8b8","f4c7","b8c7","c3b5","c7b8","b5d4"],"themes":["attraction","crushing","fork","opening","sacrifice","veryLong"]},{"puzzleid":"wX4ac","fen":"8/p4k2/2p2nr1/1p2p3/4P1n1/3B1qNQ/PPP5/1K3R2 b - - 3 34","rating":2153,"ratingdeviation":77,"moves":["f3e3","h3h7","g6g7","h7g7","f7g7","g3f5","g7f7","f5e3"],"themes":["advantage","attraction","exposedKing","fork","middlegame","pin","sacrifice","veryLong"]},{"puzzleid":"SraA3","fen":"r3k3/ppq2pr1/2pb3p/4pQn1/2N5/1BP1B3/PP3P2/3R3K b q - 6 24","rating":2188,"ratingdeviation":117,"moves":["a8d8","c4d6","d8d6","f5e5","c7e7","e5d6","e7d6","d1d6"],"themes":["advantage","attraction","fork","middlegame","veryLong"]},{"puzzleid":"uaQP2","fen":"r3k2r/1pp2ppp/p3p3/3P3P/6P1/8/q1PNQ3/1R1K3R w kq - 0 20","rating":2283,"ratingdeviation":75,"moves":["b1b7","a2d5","e2f3","d5f3","d2f3","e8c8","d1e2","c8b7"],"themes":["castling","crushing","fork","middlegame","veryLong"]},
   {"puzzleid":"IV3gu","fen":"1r6/6p1/5p2/p2K1Pk1/P1R3P1/8/8/8 w - - 9 42","rating":1150,"ratingdeviation":75,"moves":["d5c5","b8c8","c5b5","c8c4","b5c4","g5g4","c4b5","g4f5"],"themes":["crushing","endgame","master","rookEndgame","veryLong"]},{"puzzleid":"tTmae","fen":"8/p4kp1/5p1p/8/P2Pp1P1/1p1rP2P/3RK3/8 b - - 1 41","rating":1164,"ratingdeviation":117,"moves":["f7e6","d2d3","e4d3","e2d3","b3b2","d3c2","b2b1q","c2b1"],"themes":["crushing","endgame","rookEndgame","veryLong"]},{"puzzleid":"rAiKW","fen":"8/6pk/7p/1p6/4R2K/1Pr5/P6P/8 w - - 0 50","rating":1237,"ratingdeviation":76,"moves":["e4b4","g7g5","h4h5","c3h3","h5g4","h3h4","g4f5","h4b4"],"themes":["crushing","endgame","rookEndgame","skewer","veryLong"]},{"puzzleid":"RluaK","fen":"5k2/2R5/4P1pp/2K2p2/5P1P/8/8/3r4 w - - 1 44","rating":1210,"ratingdeviation":76,"moves":["c5c6","d1c1","c6d7","c1c7","d7c7","f8e7","c7c6","e7e6"],"themes":["crushing","endgame","rookEndgame","veryLong"]},{"puzzleid":"EGoFK","fen":"3R4/8/8/8/2pp4/3k4/2r5/1K6 b - - 11 70","rating":1401,"ratingdeviation":500,"moves":["c4c3","d8d4","d3d4","b1c2","d4c4","c2c1","c4d3","c1d1"],"themes":["deflection","endgame","equality","rookEndgame","veryLong","zugzwang"]},{"puzzleid":"3zZa4","fen":"3k4/R7/1P6/3K4/8/2p4P/1r6/8 w - - 1 70","rating":1186,"ratingdeviation":76,"moves":["d5c6","c3c2","a7a8","d8e7","a8a1","b2b1","a1b1","c2b1q"],"themes":["advancedPawn","crushing","endgame","promotion","rookEndgame","veryLong"]},{"puzzleid":"49LEw","fen":"5rk1/p7/4p2p/2p1Prp1/2P1RP2/P1R3P1/2P5/6K1 w - - 0 37","rating":1189,"ratingdeviation":76,"moves":["f4g5","f5f1","g1h2","f8f2","h2h3","f1h1","h3g4","h6h5"],"themes":["endgame","exposedKing","mate","mateIn4","rookEndgame","veryLong"]},{"puzzleid":"HT1hG","fen":"8/5pp1/p3p2p/8/1kP2P2/1PR3PP/1r6/2K5 b - - 4 35","rating":1219,"ratingdeviation":79,"moves":["b2b3","c3b3","b4b3","c4c5","b3c4","c5c6","c4d5","c6c7"],"themes":["advancedPawn","crushing","endgame","quietMove","rookEndgame","veryLong"]},{"puzzleid":"jyrSd","fen":"8/6kp/2P2p2/p2P4/2r1Bp2/7P/8/7K b - - 0 31","rating":1118,"ratingdeviation":75,"moves":["c4e4","c6c7","e4c4","d5d6","a5a4","d6d7","c4c7","d7d8q"],"themes":["advancedPawn","advantage","endgame","promotion","rookEndgame","veryLong"]},{"puzzleid":"XvBeL","fen":"6k1/7p/PK3p2/8/1P6/r5P1/8/8 b - - 2 36","rating":1522,"ratingdeviation":500,"moves":["g8f7","b4b5","f6f5","b6a7","a3g3","b5b6","f5f4","b6b7"],"themes":["advancedPawn","endgame","equality","quietMove","rookEndgame","veryLong"]},{"puzzleid":"8qjCN","fen":"8/8/p6p/6p1/P1p3P1/3k2P1/1Pr1p1P1/1K2R3 b - - 3 41","rating":1181,"ratingdeviation":76,"moves":["d3d2","e1e2","d2e2","b1c2","e2f2","c2c3","f2g2","c3c4"],"themes":["crushing","deflection","endgame","rookEndgame","veryLong"]},{"puzzleid":"G017I","fen":"6k1/1pp3p1/8/2PP4/pr5P/8/5P2/3R2K1 b - - 0 35","rating":1315,"ratingdeviation":143,"moves":["a4a3","d5d6","c7d6","c5d6","g8h7","d6d7","a3a2","d7d8q"],"themes":["advancedPawn","crushing","endgame","promotion","rookEndgame","veryLong"]},{"puzzleid":"BysYv","fen":"8/8/p7/1p4P1/3k4/r7/2R3K1/8 b - - 0 52","rating":1208,"ratingdeviation":75,"moves":["a3c3","c2c3","d4c3","g5g6","b5b4","g6g7","b4b3","g7g8q"],"themes":["advancedPawn","crushing","endgame","promotion","rookEndgame","veryLong"]},{"puzzleid":"2wz6R","fen":"1kRr4/7p/4p1p1/1p2Pp2/1P1r1P1P/4K3/8/2R5 b - - 5 33","rating":1183,"ratingdeviation":74,"moves":["d8c8","c1c8","b8c8","e3d4","c8d8","d4c5","d8c7","c5b5"],"themes":["crushing","endgame","rookEndgame","veryLong"]},{"puzzleid":"O3LIw","fen":"8/8/8/4k3/1p2P3/1P2K1r1/2R3P1/8 w - - 7 45","rating":1123,"ratingdeviation":78,"moves":["e3d2","g3g2","d2d3","g2c2","d3c2","e5e4","c2d2","e4d4"],"themes":["crushing","defensiveMove","endgame","rookEndgame","veryLong","zugzwang"]},{"puzzleid":"UsIyi","fen":"8/8/3k1K2/7R/4r2p/8/2P5/8 w - - 6 54","rating":1198,"ratingdeviation":76,"moves":["f6f5","e4e5","f5g6","e5h5","g6h5","h4h3","h5h4","h3h2"],"themes":["advancedPawn","crushing","endgame","rookEndgame","veryLong"]},{"puzzleid":"Qq5lE","fen":"8/8/8/5R2/rp3p2/k4P2/5KPP/8 w - - 4 56","rating":1227,"ratingdeviation":76,"moves":["f5f4","b4b3","f4f7","b3b2","f7b7","a4b4","b7b4","a3b4"],"themes":["advancedPawn","crushing","endgame","rookEndgame","veryLong"]},{"puzzleid":"43KNi","fen":"6k1/1p2K1pp/2p5/3rPRPP/8/8/6r1/8 b - - 5 43","rating":1431,"ratingdeviation":500,"moves":["h7h6","f5f8","g8h7","g5g6","g2g6","h5g6","h7g6","e5e6"],"themes":["endgame","equality","rookEndgame","veryLong"]},{"puzzleid":"3vdHU","fen":"4k3/p6R/1p2P3/2p3Kp/8/8/PP6/6r1 w - - 8 44","rating":1187,"ratingdeviation":78,"moves":["g5h5","g1h1","h5g6","h1h7","g6h7","e8e7","h7g6","e7e6"],"themes":["crushing","endgame","rookEndgame","veryLong"]},{"puzzleid":"Rga5a","fen":"8/7R/1pr1k2p/p1pp4/2P2K2/7P/PP6/8 b - - 1 32","rating":1247,"ratingdeviation":80,"moves":["d5c4","h7h6","e6d7","h6c6","d7c6","h3h4","c6d5","h4h5"],"themes":["crushing","defensiveMove","endgame","quietMove","rookEndgame","veryLong"]},{"puzzleid":"gnJgN","fen":"8/8/p1r5/4R3/PP3kpp/8/5PP1/6K1 w - - 0 43","rating":1222,"ratingdeviation":91,"moves":["e5h5","c6c1","g1h2","g4g3","f2g3","h4g3","h2h3","c1h1"],"themes":["endgame","mate","mateIn4","rookEndgame","veryLong"]},{"puzzleid":"vGxD9","fen":"8/7R/1p2rp2/5k2/1P6/5K2/8/8 b - - 6 48","rating":1112,"ratingdeviation":76,"moves":["e6e4","h7h5","f5g6","f3e4","g6h5","e4f5","b6b5","f5f6"],"themes":["crushing","deflection","endgame","rookEndgame","veryLong"]},{"puzzleid":"rzZ1I","fen":"8/1p1k4/p3RKp1/5P2/8/7r/PP6/8 w - - 0 47","rating":1167,"ratingdeviation":77,"moves":["f5g6","h3f3","f6e5","f3e3","e5f5","e3e6","g6g7","e6e8"],"themes":["crushing","defensiveMove","endgame","rookEndgame","veryLong"]},{"puzzleid":"rBDKD","fen":"8/8/p4R2/7p/k3p3/r7/P5PP/6K1 b - - 0 46","rating":1188,"ratingdeviation":78,"moves":["a3a2","f6a6","a4b3","a6a2","b3a2","g1f2","a2b3","f2e3"],"themes":["crushing","endgame","rookEndgame","veryLong"]},{"puzzleid":"h8fn0","fen":"4r3/pp3kp1/4pr2/3pRP1p/2pP4/P1P2KPP/2P5/4R3 b - - 0 31","rating":1193,"ratingdeviation":79,"moves":["f6f5","e5f5","e6f5","e1e8","f7e8","f3f4","h5h4","g3h4"],"themes":["advantage","discoveredAttack","endgame","rookEndgame","veryLong"]}]
   )

  const eazy_puzzles = ref([{"puzzleid":"CKMJe","fen":"6RQ/2r3p1/pq1p1pkp/3Pp3/7P/3n4/P4PP1/4R1K1 w - - 5 29","rating":1566,"ratingdeviation":352,"moves":["e1e3","b6b1","g1h2","d3f2","g8g7","c7g7","e3g3","g6h5","g3g7","b1h1","h2g3","h1h4","g3f3","h4f4"],"themes":["advantage","deflection","endgame","veryLong"]},{"puzzleid":"MTdWt","fen":"6rk/r2q1p1p/8/p1pppNPR/1p2P3/3PQ3/P1P1KP2/8 b - - 1 31","rating":1862,"ratingdeviation":366,"moves":["d5e4","h5h7","h8h7","e3h3","h7g6","d3e4","f7f6","h3h6","g6f7","h6f6","f7e8","f5d6","d7d6","f6d6"],"themes":["advantage","attraction","endgame","kingsideAttack","sacrifice","veryLong"]},{"puzzleid":"Efzqx","fen":"2r5/q4kp1/3P4/3pQp1p/p3pPbP/P5P1/8/1R3RK1 w - - 3 37","rating":1229,"ratingdeviation":326,"moves":["g1h2","c8c2","h2h1","f7g6","b1b2","c2b2","e5b2","e4e3","f1e1","d5d4","b2b5","a7a8","h1g1","a8f3"],"themes":["advantage","endgame","quietMove","veryLong"]},{"puzzleid":"f8N2O","fen":"8/8/p3p1p1/8/8/3Q4/P1P2k2/1K1Bq3 w - - 19 52","rating":1565,"ratingdeviation":76,"moves":["d3e2","e1e2","d1e2","f2e2","c2c4","g6g5","b1b2","g5g4","c4c5","g4g3","c5c6","g3g2","c6c7","g2g1q"],"themes":["advancedPawn","advantage","endgame","promotion","quietMove","veryLong"]},{"puzzleid":"bEbXk","fen":"6rk/pp3bp1/7p/1Pp2pB1/P6Q/2R4P/5PPK/4q3 b - - 2 31","rating":1736,"ratingdeviation":247,"moves":["e1c3","g5h6","f7h5","h4h5","g7g6","h5h4","g6g5","h6g5","h8g7","h4h6","g7f7","h6h7","g8g7","h7f5"],"themes":["advantage","discoveredAttack","endgame","quietMove","veryLong"]},{"puzzleid":"6JYNK","fen":"8/5p2/5Pp1/1pK3Pp/1P4kP/8/8/8 w - - 5 44","rating":1445,"ratingdeviation":75,"moves":["c5b5","g4h4","b5c5","h4g5","b4b5","h5h4","b5b6","h4h3","b6b7","h3h2","b7b8q","h2h1q","b8e5","g5h6"],"themes":["advancedPawn","advantage","defensiveMove","endgame","pawnEndgame","promotion","quietMove","veryLong"]},{"puzzleid":"cRY0h","fen":"5r2/4n1kp/3p4/3Pp1P1/4Pp2/5B2/P4K1Q/q6R b - - 7 33","rating":1634,"ratingdeviation":284,"moves":["a1a2","f3e2","a2a7","f2g2","f4f3","g2g3","f8f7","h2h7","g7f8","h7h6","f7g7","h6f6","f8g8","e2f3"],"themes":["advantage","defensiveMove","endgame","veryLong"]}])
  const difficultyOptions = [
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];
const selectedDifficulty = ref('')
let boardApi = null;
const boardConfig = ref({
    coordinates:true,
    animation: {
    enabled: true,
    duration: 700,
  },
})

function formatDifficulty(value){
  if(value==''){
    return ''
  }
  // console.log(value.at(0))
  return value.at(0).toUpperCase() + value.slice(1).toLowerCase();
}

const generateHint = () => {
  if (current_puzzle.value.moves_formatted) {
    const current_move = current_puzzle.value.moves_formatted.find(el => !el.isCompleted);

    if (current_move) {
  const piece = boardApi.getSquare(current_move.from);

  if (!piece || !piece.type) {
    message.value = {
      text: "No piece found for the next move.",
      type: 'hint'
    };
    return;
  }

  switch (piece.type.toLowerCase()) {
    case 'p':
      message.value = {
        text: "Push your pawn to gain space or support a piece.",
        type: 'hint'
      };
      break;
    case 'n':
      message.value = {
        text: "Knights work best near the center — aim there.",
        type: 'hint'
      };
      break;
    case 'b':
      message.value = {
        text: "Use your bishop’s diagonal to apply pressure.",
        type: 'hint'
      };
      break;
    case 'r':
      message.value = {
        text: "Rooks like open files — activate it.",
        type: 'hint'
      };
      break;
    case 'q':
      message.value = {
        text: "Coordinate your queen with other pieces.",
        type: 'hint'
      };
      break;
    case 'k':
      message.value = {
        text: "Keep your king safe or move it toward the center later.",
        type: 'hint'
      };
      break;
    default:
      message.value = {
        text: "No hint available for this piece.",
        type: 'hint'
      };
  }
} else {
  message.value = {
    text: "All moves are completed!",
    type: 'hint'
  };
}
} else {
  message.value = {
    text: "No puzzle data available.",
    type: 'hint'
  };
}

};


const computedDifficulty = computed(()=>{
  let filteredPuzzles = []
   if(selectedDifficulty.value=='easy'){
   filteredPuzzles = puzzles.value.filter(el=>((el.rating<=700&&el.rating>=300)&&el.isCompleted==false))
  }else if(selectedDifficulty.value=='medium'){
    filteredPuzzles = puzzles.value.filter(el=>((el.rating>=700&&el.rating<=1100)&&el.isCompleted==false))
  }
  else if(selectedDifficulty.value=='hard'){
    filteredPuzzles = puzzles.value.filter(el=>((el.rating>=1100)&&el.isCompleted==false))
  }else{
    filteredPuzzles = puzzles.value
  }
  const allThemes = filteredPuzzles.flatMap(p => p.themes)
  return [...new Set(allThemes)]
})

function startTimer() {
 
  timer = setInterval(() => {
    seconds.value++
  }, 1000)
}
function stopTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function resetTimer() {
  stopTimer()
  seconds.value = 0
  startTimer() 
}

const formatTime = computed(()=>{
 const minutes = Math.floor(seconds.value / 60)
  const seconds_1 = seconds.value % 60
  return `${minutes}:${seconds_1.toString().padStart(2, '0')}`
})

const game = new Chess()

const current_puzzle=ref({})

function onBoardCreated(api) {
  boardApi = api;
 
}

onMounted(()=>{
   puzzles.value.map(el=>el.isCompleted=false)
    loadFen()
})

function handleMove(move){
    let current_move = current_puzzle.value.moves_formatted.find(el=>!el.isCompleted)
    let current_index = current_puzzle.value.moves_formatted.findIndex(el=>!el.isCompleted)
    if(current_move.to_be_completed_by=='human'){


    if(move.from==current_move.from){
        if(move.to==current_move.to){
            message.value ={
            text: 'Correct Move!',
            type: 'success'
            }
            let idx = current_puzzle.value.moves_formatted.findIndex(el=>!el.isCompleted)
            current_puzzle.value.moves_formatted[idx].isCompleted= true
            let auto_move = current_puzzle.value.moves_formatted[idx+1]
            if(current_puzzle.value.moves_formatted.length == current_puzzle.value.moves_formatted.filter(el=>el.isCompleted).length){
              let puzzleIdx = puzzles.value.findIndex(el=> el.puzzleid==current_puzzle.value.puzzleid)
              puzzles.value.at(puzzleIdx).isCompleted = true
              stopTimer()
              showCompletionDialog.value = true 
            rating.value = getRating()
              return
            }
            if(boardApi){
            boardApi.getTurnColor()
                boardApi.move({from:auto_move.from ,to:auto_move.to})
                current_puzzle.value.moves_formatted[idx+1].isCompleted=true
            }
            
        }else{
           message.value = {
            text: 'Right Piece but wrong square!',
            type: 'warning'
           }
        }
         
    }
    else{
        message.value = {
          text: 'wrong piece selected!',
          type: 'error'
        }
        game.undo()
    }
     }
}

const gameCount = computed(()=>{
  if(selectedDifficulty.value!=''){
    return puzzles.value.filter(el=> el.isCompleted==false).length
  }
  return puzzles.value.filter(el=>el.isCompleted==false).length
})

function getRating(){
  switch (selectedDifficulty.value) {
    case 'easy':
      if ( seconds.value <= 30) return 3
      if ( seconds.value <= 45) return 2
      return 1

    case 'medium':
      if ( seconds.value <= 60) return 3
      if ( seconds.value <= 90) return 2
      return 1

    case 'hard':
      if ( seconds.value <= 120) return 3
      if ( seconds.value <= 180) return 2
      return 1

    default:
      return 0
  }
}

function loadFen() {
  let puzzle = {}
  let filteredPuzzle = []
  let count = 0
  if(selectedDifficulty.value!='' && selectedGameType!=''){
    if(selectedDifficulty.value=='easy'){
    count = puzzles.value.filter(el=>((el.rating<=700&&el.rating>=300)&&el.isCompleted==false&&el.themes.includes(selectedGameType.value))).length
  }else if(selectedDifficulty.value=='medium'){
    count = puzzles.value.filter(el=>((el.rating>=700&&el.rating<=1100)&&el.isCompleted==false&&el.themes.includes(selectedGameType.value))).length
  }
  else if(selectedDifficulty.value=='hard'){
    count = puzzles.value.filter(el=>((el.rating>=1100)&&el.isCompleted==false&&el.themes.includes(selectedGameType.value))).length
  }

  }

  if(selectedDifficulty.value=='easy'&&count>0){
    filteredPuzzle = puzzles.value.filter(el=>((el.rating<=700&&el.rating>=300)&&el.isCompleted==false&&el.themes.includes(selectedGameType.value)))
  }else if(selectedDifficulty.value=='medium'&&count>0){
    filteredPuzzle = puzzles.value.filter(el=>((el.rating>=700&&el.rating<=1100)&&el.isCompleted==false&&el.themes.includes(selectedGameType.value)))
  }
  else if(selectedDifficulty.value=='hard'&&count>0){
    filteredPuzzle = puzzles.value.filter(el=>((el.rating>=1100)&&el.isCompleted==false&&el.themes.includes(selectedGameType.value)))
  }else {
    filteredPuzzle = puzzles.value
  }
  puzzle = filteredPuzzle.at(Math.random()*filteredPuzzle.length)
  current_puzzle.value = puzzle
  if(selectedDifficulty.value==''){
  if(current_puzzle.value.rating>=300&&current_puzzle.value.rating<=700){
    selectedDifficulty.value = 'easy'
  }else if(current_puzzle.value.rating>=700&&current_puzzle.value.rating<=1100){
    selectedDifficulty.value = 'medium'
  }else if(current_puzzle.value.rating>=1100){
    selectedDifficulty.value = 'hard'
  }
  }
  current_puzzle.value.moves_formatted = []
  current_puzzle.value.moves.map((el,idx)=>{
    current_puzzle.value.moves_formatted.push({
        'from':el.slice(0,2),
        'to':el.slice(2,4),
        'isCompleted':false,
        'to_be_completed_by': idx % 2 === 0 ? 'machine' :'human'
      }) 
    })
  
  let fen = puzzle.fen
  if (boardApi) {
    let first_move = current_puzzle.value.moves_formatted[0]
    
    boardApi.setPosition(fen);
    boardApi.move({from:first_move.from,to:first_move.to})
    startTimer()
    current_puzzle.value.moves_formatted[0].isCompleted=true
    message.value = {
      text:`Hello Padawan,
      ${boardApi.getTurnColor()} to move!`,
      type: 'info'
      }
    if(getTurnFromFEN(fen)=="black"){
    boardApi.toggleOrientation()
  }
  } else {
    console.error("Board not ready yet!");
  }
}

function getTurnFromFEN(fen) {
  if (!fen || typeof fen !== "string") return null;
  
  const parts = fen.trim().split(" ");
  
  const turn = parts[1];
  
  if (turn === "w") return "white";
  if (turn === "b") return "black";
  
  return null; 
}

</script>
