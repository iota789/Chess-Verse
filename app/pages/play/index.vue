<template>
  <div class="grid grid-cols-1 lg:grid-cols-[60%_1fr] p-3 lg:p-5 bg-[#f6f6f8] min-h-screen  gap-20">
    <div class="flex flex-col gap-2">
      <div class="flex flex-row justify-between items-center mx-auto w-full max-w-[500px]">
        <div class="flex flex-row gap-2">
          <img :src="selected_master.image_url" alt="" class="w-14 h-14 " >
          <div class="flex flex-col justify-between">

            <p class="text-lg text-black font-medium">{{ selected_master.name }}</p>
            <!-- <p class="text-black">{{ moves }}</p> -->
              <div class="flex flex-row items-center mt-2">
                <div v-for="(item,index) in black_captured_pieces">
                  <img src="/icons/pieces/white/rook.png" v-if="item=='r'"  alt="" class="w-6 h-6" >
                  <img src="/icons/pieces/white/queen.png" v-if="item=='q'"  alt="" class="w-6 h-6" >
                  <img src="/icons/pieces/white/king.png" v-if="item=='k'"  alt="" class="w-6 h-6" >
                  <img src="/icons/pieces/white/knight.png" v-if="item=='n'"  alt="" class="w-6 h-6" >
                  <img src="/icons/pieces/white/bishop.png" v-if="item=='b'"  alt="" class="w-6 h-6" >
                  <img src="/icons/pieces/white/pawn.png" v-if="item=='p'"  alt="" class="w-6 h-6" >
                </div>
                
              </div>
          </div>
          
        </div>
        <div class="bg-white rounded-xl shadow-md  flex items-center px-4 h-10  text-black"
        :class="{
          'border-blue-500 border-2  text-blue-500':selected_master.isTimerRunning,
          'border-red-500 border-2 text-black !bg-red-400': selected_master.isTimerRunning&&selected_master.timer<30
        }"

        >
          <p class="font-semibold ">{{ masterTime }}</p>
        </div>
      </div>
      <TheChessboard
      @board-created="handleBoardCreated"
      @move="handleMove"
      :player-color="'white'"
      class="!w-full !aspect-square  !max-w-[500px] !mx-auto"
      />
       <div class="flex flex-row justify-between items-center mx-auto w-full max-w-[500px]">
        <div class="flex flex-row gap-2">

          <img :src="selected_student.image_url" alt="" class="w-14 h-14 " >
          <div class="flex flex-col justify-between">
              <p class="text-lg text-black font-medium">{{selected_student.name}}</p>
               <div class="flex flex-row items-center">
                <div v-for="(item,index) in white_captured_pieces">
                  
                  <img src="/icons/pieces/black/rook.png" v-if="item=='r'"  alt="" class="w-6 h-6" >
                  <img src="/icons/pieces/black/queen.png" v-if="item=='q'"  alt="" class="w-6 h-6" >
                  <img src="/icons/pieces/black/king.png" v-if="item=='k'"  alt="" class="w-6 h-6" >
                  <img src="/icons/pieces/black/knight.png" v-if="item=='n'"  alt="" class="w-6 h-6" >
                  <img src="/icons/pieces/black/bishop.png" v-if="item=='b'"  alt="" class="w-6 h-6" >
                  <img src="/icons/pieces/black/pawn.png" v-if="item=='p'"  alt="" class="w-6 h-6" >
                </div>
              </div>
          </div>
          
        </div>
        <div class="bg-white rounded-xl shadow-md  flex items-center px-4 h-10  text-black"
        :class="{'border-blue-500 border-2  text-blue-500':selected_student.isTimerRunning,
          '!border-red-600 !border-2 !text-white !bg-red-500': selected_student.isTimerRunning&&selected_student.timer<30
        }"
        >
          <p class="font-semibold ">{{ studentTime }}</p>
        </div>
      </div>
    </div>
   
    <div class="flex flex-col gap-4 items-start justify-start">
      <!-- <p class="text-black"> {{ moves }}</p> -->
      <div class="flex flex-col bg-white  rounded-lg shadow-md w-full lg:w-96 ">
        <!-- <h2 class="font-medium text-xl text-black p-3">Game Information</h2> -->
        <!-- <p class="text-xs font-normal text-black">{{ materialCount }}</p> -->
        <div class="overflow-auto h-64 border rounded-md px-3 mt-3">

  <table class="w-full text-left border-collapse">
    <thead>
      <tr class="bg-gray-100 text-gray-700 font-bold">
        <th class="p-2">#</th>
        <th class="p-2">WHITE</th>
        <th class="p-2">BLACK</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="(move, index) in moves"
        :key="index"
        class="border-b"
        :class="{ 'bg-gray-100': index % 2 !== 0 }"
      >
        <td class="p-2 border-b text-black">{{ index + 1 }}</td>

        <td
          class="p-2 m-4 border-b border-b-black text-gray-500 transition-colors duration-200 cursor-pointer"
          @click="()=>{
            ply_count = move.white.ply_count
            boardAPI?.viewHistory(move.white.ply_count);
          }"
        >
         <p 
         :class="{ '!text-blue-400': ply_count == move.white.ply_count }"
         >

           {{ move.white?.move }}
         </p> 
        </td>

        <td
          class="p-2 border-b border-b-black text-gray-500 transition-colors duration-200 cursor-pointer"
           @click="()=>{
            ply_count = move.black.ply_count
            boardAPI?.viewHistory(move.black.ply_count);
          }"
        >
        <p
        
           :class="{ '!text-blue-400': ply_count == move.black?.ply_count }"
        >

          {{ move.black?.move }}
        </p>
        </td>
      </tr>
    </tbody>
  </table>
</div>

  <div class="flex flex-row justify-between mt-4 w-full bg-gray-100 p-3">
    <Button class="!bg-gray-200 !rounded-4xl !border-none"
    :class="{
      'pointer-events-none opacity-50' : ply_count== 0 
    }"
          @click="()=>{
        ply_count = 0;
        boardAPI.viewHistory(0);
      }"
    ><i class="pi pi-step-backward text-black"  ></i></Button>
    <Button class="!bg-gray-200 !rounded-4xl !border-none"
    :class="{
      'pointer-events-none opacity-50' : ply_count== 0 
    }"
    @click="()=>{
      if(ply_count>=0){
        ply_count--;
      }
      boardAPI.viewHistory(ply_count);
    }"
    ><i class="pi pi-backward"></i></Button>
    <Button class="!bg-gray-200 !rounded-4xl !border-none"
    :class="{
      'pointer-events-none opacity-50' : ply_count==moves_list.length
    }"
     @click="()=>{
      if(ply_count<=moves_list.length){
        ply_count++;
      }
      boardAPI.viewHistory(ply_count);
    }"
    ><i class="pi pi-forward"></i></Button>
    <Button class="!bg-gray-200 !rounded-4xl !border-none"
     :class="{
      'pointer-events-none opacity-50' : ply_count==moves_list.length
    }"
          @click="()=>{
        ply_count = moves_list.length;
        boardAPI.viewHistory(moves_list.length);
      }"
    ><i class="pi pi-step-forward"></i></Button>
  </div>
      </div>
      <!-- <div class="flex flex-col w-96 bg-white rounded-lg shadow-md p-6">
        <h2 class="text-black font-semibold text-lg">Stockfish Difficulty</h2>
        <p class="text-gray-500 text-sm mt-3">Adjust the ELO rating of the AI opponent.</p>
        <Slider v-model="value" :step="20" class="w-full my-6" />
      </div> -->
      <div class="flex flex-col w-full lg:w-96 bg-white rounded-lg shadow-md p-6">
        <h2 class="text-black font-semibold text-lg">Game Controls</h2>
       <Button class="w-full !bg-blue-500 !text-white !font-semibold !p-2 !border-none mt-4" 
       @click="()=>{
        moves_list = [];
        stopTimer()
        boardAPI.resetBoard();
        selected_slot = '';
        selected_side = '';
        visible=true;
       }"
       >
        <i class="pi pi-plus text-white"></i>
        New Game
       </Button>
      
      
       <div class="grid grid-cols-2 gap-5 mt-3">
        <Button class="w-full !bg-gray-200 !text-black !border-none !p-2 text-sm" @click="resign_visible=true">
        <i class="pi pi-flag-fill text-black"></i>
       Resign
       </Button>
       <!-- <p class="text-black">{{ boardAPI?.getTurnColor() }}</p> -->
        <Button class="w-full !bg-gray-200 !text-black !border-none !p-2 text-sm"
        :disabled="boardAPI?.getTurnColor()!='white'&&moves.length>0"
        @click="()=>{
          ply_count = moves_list.length-2
          boardAPI?.undoLastMove();
          boardAPI?.undoLastMove();
          moves_list.splice(moves_list.length-2,2)
        }"
        >
        <i class="pi pi-undo text-black"></i>
        Undo
       </Button>
       </div>
       
      </div>
    </div>
  </div>
    <Dialog :draggable="false" v-model:visible="visible" class="!bg-white !text-black !p-1 m-2 lg:m-0 w-full lg:!w-auto" modal :closable="false" v-on:after-hide="()=>{
       selected_student = students.find(el=>el.side==selected_side);
       selected_master = masters.find(el=>el.side==selected_side);
       setTimer();
       startTimer('student');
    }">
       <h2 class="font-medium text-center text-xl">Choose Your Side</h2>
       <div class="grid grid-cols-2  gap-10 mt-4 ">
          <div
          @click="()=>{
            selected_side= item.side_name;
            if(selected_slot!=''){
            visible=false
            }
          }"
           class=" flex flex-col justify-between cursor-pointer  items-center border-2 border-gray-400 p-3 rounded-lg w-full "
           :class="{
            '!bg-blue-200 !border-2 !border-blue-500':item.side_name==selected_side
           }"
           v-for="(item,index) in sides">
              <img :src="item.img_url" alt="" class="w-16"
              :class="{'!pt-3':item.side_name=='jedi'}"
              >
              <p class="text-md font-medium mt-2">{{ item.side_name }}</p>
          </div>
          
       </div>
       <h3 class="text-md font-medium  mt-6">Select Time Control</h3>
       <div class="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-3" >
        <div class="bg-gray-200 rounded-md p-2 text-black" v-for="(item,index) in time_slots"
        :class="{'!bg-blue-200 !border-2 !border-blue-500 ':item==selected_slot}"
        @click="()=>{
          selected_slot=item;
          if(selected_side!=''){
            visible=false
          }
        }"
        >
          <p class="text-center">{{ item }}</p>
        </div>
       </div>
    </Dialog >
    <Dialog :draggable="false" v-model:visible="game_over_dialog" class="!bg-white !text-black !p-1 m-2 lg:m-0 w-full lg:!w-96" modal :closable="false" >
      <div class="flex flex-col items-center justify-center">
          <img :src="game_over_details.link_url" alt="">
          <p class="text-black text-sm my-3 font-medium text-nowrap">{{ game_over_details.message }}</p>
          <div class="flex flex-row gap-5 ">

           <Button class="w-auto !bg-blue-500 !text-white !font-semibold !p-2 !border-none "
           @click="()=>{
            game_over_dialog = false;
            selected_side = '';
            selected_slot = '';
            visible = true;

}"  
           >
        <i class="pi pi-plus text-white"></i>
        New Game
       </Button>
            <Button class="w-auto !bg-blue-500 !text-white !font-semibold !p-2 !border-none "
            @click="()=>{

              game_over_dialog=false;
            }"
            >
        <i class="pi pi-search text-white"></i>
        Review Game
       </Button>
          </div>
      </div>
    </Dialog> 
    <Dialog :draggable="false" v-model:visible="resign_visible" class="!bg-white !text-black !p-1 m-2 lg:m-0 w-full lg:!w-auto" modal :closable="false">
      <div class="flex flex-col px-10 gap-3 items-center">

       
      <img v-if="selected_side=='Sith'" src="/animation/sith_resign.gif" alt="" >
        <img v-if="selected_side=='Jedi'" src="/animation/jedi_resign.gif" alt="">

        <h2 class="text-xl font-medium text-sm " v-if="selected_side=='Sith'">You think your absence will change anything? Foolish.</h2>
        <h2 class="text-xl font-medium " v-if="selected_side=='Jedi'">Failed, have you? Or merely tired of trying?</h2>
        <div class="flex flex-row justify-end gap-3 ">
          <Button class="!bg-transparent !border-blue-500 !border-2 !text-blue-500" @click="()=>{
            resign_visible=false
          }">
            <span v-if="selected_side=='Sith'" >
             Unlimited Power!
            </span>
            <span v-else="selected_side=='Jedi'">
             Continue, I shall
            </span>
          </Button>
          <Button class="!bg-blue-500 !border-none !text-white"
          @click="()=>{
            resign_visible = false;
            selected_slot = '';
            selected_side = '';
            visible= true;
          }"
          >
             <span v-if="selected_side=='Sith'">
             Do It!
            </span>
            <span v-else="selected_side=='Jedi'">
             Quit, I Shall
            </span>
          </Button>
        </div>
         </div>
    </Dialog>

       
     
   
  
</template>


<script setup>
import { TheChessboard } from 'vue3-chessboard';
import { Engine } from '../../../public/engine';
let boardAPI;
let engine;
const value = ref(1200);
const resign_visible = ref(false)
const fen_list = ref([])

const moves_list = ref([
])
const materialCount = ref(0)
const selected_side= ref('')
const selected_slot= ref('')
const selected_master= ref({
  name:'R2-D2',
  image_url :  `${useAppConfig().baseURL}icons/r2-d2.jpg`,
  timer : 600,
  isTimerRunning:false
}
)
const selected_student= ref({
  name:'C3P0',
  image_url : `${useAppConfig().baseURL}icons/c3p0.jpg`,
  timer :600,
  isTimerRunning:false
})

const masters = ref([
  {
    name:'Yoda',
    image_url:`${useAppConfig().baseURL}icons/yoda.jpg`,
    side: 'Jedi'
  },{
    name:'Palpatine',
    image_url:`${useAppConfig().baseURL}icons/palpatine.jpg`,
    side: 'Sith'
  },
])
const students = ref([
  {
    name:'ObiWan',
    image_url:`${useAppConfig().baseURL}icons/obiwan.png`,
    side: 'Jedi'
  },{
    name:'Anakin',
    image_url : `${useAppConfig().baseURL}/icons/anakin.jpg`,
    side:'Sith'
  }
])

const ply_count = ref(0)
const time_slots = ref([
  '1 : 1',
  '2 : 1',
  '5 : 5',
  '5 : 3',
  '10 : 10',
  '10 : 5',
  '10 : 3',
  '15 : 15'
])

const black_captured_pieces = ref([])
const white_captured_pieces = ref([])
const game_over_dialog= ref(false)
const sides = ref([
  {
  img_url:`${useAppConfig().baseURL}icons/jedi.png`,
  side_name:'Jedi'
},
  {
  img_url:`${useAppConfig().baseURL}icons/sith.png`,
  side_name:'Sith'
}
])
const timer1 = ref()
const timer2 = ref()
const isRunning = ref(false)
let studentId= null
let masterId= null

const visible = ref(false)
// const moves = [
//   { white: "e4", black: "e5" },
//   { white: "Nf3", black: "Nc6" },
//   { white: "Bb5", black: "a6" },
//   { white: "Ba4", black: "Nf6" },
//   { white: "O-O", black: "Be7" },
//   { white: "Re1", black: "b5" },
//   { white: "Bb3", black: "d6" },
//   { white: "c3", black: "O-O" },
//   { white: "h3", black: "..." }
// ];
const master_victory = ref([{
  messages: [
  "Lose a game, you may. Learn, you must.",
  "Patience, the key to mastery is.",
  "Lost, have you? Wiser, you are.",
  "Fallen pieces, not hope.",
  "In defeat, the teacher hides.",
  "Checkmated, not defeated you are.",
  "Blundered, have you? Clarity comes.",
  "Calm after loss, strong you stay.",
  "Every pawn fallen, the Force whispers.",
  "Chase victory not. Seek wisdom."
],side:'Jedi'
},
{
  messages:[
  "Good… let the blunder flow through you.",
  "Every loss, a lesson in power.",
  "Your defeat was inevitable.",
  "The pieces fall… as they were meant to.",
  "Only through failure do you learn control.",
  "You lost nothing. You were merely outplayed.",
  "Suffer the loss. Embrace the hate.",
  "The board bends to the will of the cunning.",
  "Your king falls, and I rise.",
  "Patience, apprentice… the next game will be yours."
],
side:'Sith'
}
])

const student_victory = ref([{
  message:[
    "Patience wins more than skill.",
  "Trust the board, not your fear.",
  "Every move reveals your discipline.",
  "The calm mind sees all tactics.",
  "A true master never rushes.",
  "You must learn when to let go.",
  "Victory is clarity, not conquest.",
  "Even in loss, there is purpose.",
  "Your opponent’s anger blinds him.",
  "Be mindful of the next move, not the last."
  ],
  side: 'Jedi'
},{
  message:[
 "I don’t lose. I just haven’t won yet.",
  "If I move fast enough, they can’t think.",
  "Patience is for those afraid to act.",
  "I see victory, and I take it.",
  "Rules don’t win games—will does.",
  "They underestimated me. Again.",
  "Every loss fuels my next attack.",
  "I’ll sacrifice anything to win.",
  "Control the board? No… dominate it.",
  "The Force isn’t about balance—it’s about power."
  ],
  side:'Sith'
}
])


const game_over_details = ref({
  message:'',
  link_url: ''
})
function handleBoardCreated(boardApi) {
  boardAPI = boardApi;

  engine = new Engine(boardApi);
}
function setTimer(){
  let parts=selected_slot.value.split(':').map(Number)
  // parts=parts.map(el=>el.trim())
  console.log(parts)
  timer1.value = parts[0]
  timer2.value = parts[1]
  selected_student.value.timer = Math.round(timer1.value*60)
  selected_master.value.timer = Math.round(timer2.value*60)
}

const masterTime =computed(()=>{
  const mins = Math.floor(selected_master.value.timer / 60);
  const secs = (selected_master.value.timer % 60).toString().padStart(2, '0');
  return `${mins} : ${secs}`;
}
)
const studentTime =computed(()=>{
  const mins = Math.floor(selected_student.value.timer/ 60);
  const secs = (selected_student.value.timer % 60).toString().padStart(2, '0');
  return `${mins} : ${secs}`;
}
)


const moves = computed(() => {
  const formatted = []
  let temp = {}

  moves_list.value.forEach((move, index) => {
    if (move.color === 'w') {
      temp = {
        white: {
         move: move.move,
         isCurrent : index == moves_list.value.length-1 ? true : false,
         ply_count : index + 1 
        },
        black: null,
      }
    } else if (move.color === 'b') {
      temp.black = {
         move: move.move,
         isCurrent : index == moves_list.value.length-1 ? true : false,
         ply_count : index + 1 
        },
      formatted.push(temp)
      temp = {}
    }

    // handle incomplete (last white-only) move
    if (index === moves_list.value.length - 1 && move.color === 'w') {
      formatted.push(temp)
    }
  })

  return formatted
})

function handleMove() {
  const history = boardAPI?.getHistory(true);
  let move = boardAPI.getLastMove()
  let count= boardAPI?.getMaterialCount()
  materialCount.value = count.materialDiff
  fen_list.value.push(move?.after)
  let captured_pieces = boardAPI.getCapturedPieces()
  white_captured_pieces.value = captured_pieces.white
  black_captured_pieces.value = captured_pieces.black
  if(move.color=='w'){
    stopTimer('student');
    startTimer('master');
  }else{
    stopTimer('master');
    startTimer('student')
  }

  moves_list.value.push({'move':move?.san,'pgn':boardAPI?.getPgn(),'color':move.color})
  console.log(moves_list.value)
  ply_count.value= ply_count.value+1;
  const moves = history?.map((move) => {
    if (typeof move === 'object') {
      return move.lan;
    } else {
      return move;
    }
  });


  if (moves) {
    engine?.sendPosition(moves.join(' '));
  }
  if(boardAPI.getIsGameOver()){
    stopTimer();
    game_over_dialog.value = true
   
    if(move.color=='w'){ 

      
      if(selected_side.value=='Jedi'){
        game_over_details.value = {
          message:'Victory is thine',
          link_url: `${useAppConfig().baseURL}animation/jedi_victory.gif`
        }
      }else{
         game_over_details.value = {
           message:'Victory is thine',
          link_url: `${useAppConfig().baseURL}animation/sith_win.gif`
        }
      }
    }else{
      let message = master_victory.value.find(el=>el.side==selected_side.value);
      let msg = message.messages.at(Math.random()*10)
      if(selected_side.value=='Jedi'){
        game_over_details.value = {
          message:msg,
          link_url: `${useAppConfig().baseURL}animation/jedi_loss.gif`
        }
      }else{
        game_over_details.value = {
          message:msg,
          link_url: `${useAppConfig().baseURL}animation/sith_loss.gif`
        }
      }
    }
  }
}

function stopTimer(move){
  if(move=='student'){
  selected_student.value.isTimerRunning = false
  clearInterval(studentId)
  studentId = null
  }else{
  selected_master.value.isTimerRunning = false
  clearInterval(masterId)
  masterId = null
  }
}

function startTimer(move) {
  if(move=='student'){
    if(selected_student.value.isTimerRunning) return
    selected_student.value.isTimerRunning = true
    studentId = setInterval(() => {
      if (selected_student.value.timer > 0) {
        selected_student.value.timer--
      } else {
        let message = master_victory.value.find(el=>el.side==selected_side.value);
      let msg = message.messages.at(Math.random()*10)
        if(selected_side.value=='Jedi'){
        game_over_details.value = {
          message:msg,
          link_url: `${useAppConfig().baseURL}animation/jedi_loss.gif`
        }
      }else{
        game_over_details.value = {
           message:msg,
          link_url: `${useAppConfig().baseURL}animation/sith_loss.gif`
        }
      }
        game_over_dialog.value= true;
        stopTimer()
      }
    }, 1000)
  }else{
    if(selected_master.value.isTimerRunning) return
    selected_master.value.isTimerRunning = true
     masterId = setInterval(() => {
      if ( selected_master.value.timer > 0) {
        selected_master.value.timer--
      } else {
         if(selected_side.value=='Jedi'){
        game_over_details.value = {
          message:'Victory is thine',
          link_url: `${useAppConfig().baseURL}animation/jedi_victory.gif`
        }
      }else{
         game_over_details.value = {
           message:'Victory is thine',
          link_url: `${useAppConfig().baseURL}animation/sith_win.gif`
        }
      }
        game_over_details.value = true
        stopTimer()
      }
    }, 1000)
  }
}



onMounted(()=>{
  visible.value=true
})
</script>

