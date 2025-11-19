
  <template>
  <div class="flex flex-col w-full min-h-screen bg-[#f6f6f8] text-[#111218]">
    <main class="flex flex-1 justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col w-full max-w-6xl flex-1">
        <section class="flex flex-col items-center text-center mb-16 sm:mb-24" >
          <p class="text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]" >
            How Chess Pieces Move
          </p>
          <p class="text-[#616889] text-base md:text-lg font-normal leading-normal mt-4 max-w-3xl">
            Click on a card to learn about each piece, its movements and special rules.
            An interactive board will show you exactly how it works.
          </p>

          <div class="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10 w-full px-4 md:px-20">
            <div @click="()=>{
                selected_data = item
                showDialog=true;}"
              v-for="(item, index) in card_data"
              :key="index"
              class="flex cursor-pointer flex-col items-center gap-4 p-6 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                class="h-20 w-20 object-contain"
                :src="item.image_url"
                :alt="item.piece_name"
              />
              <p class="text-lg font-bold">{{ item.piece_name }}</p>
             
            </div>
          </div>
        </section>

        <section class="flex flex-col items-center text-center mb-16 sm:mb-24" id="endgame">
          <p class="text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
            Ways a Chess Game Can End
          </p>
          <p class="text-[#616889] text-base md:text-lg font-normal leading-normal mt-4 max-w-3xl">
            Understanding these key situations is crucial to mastering the game.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-10 justify-items-center">
            <div
              v-for="(item, index) in more_data"
              :key="index"
              class="flex flex-col md:flex-row items-center md:items-center gap-6 p-6 w-full max-w-[30rem] rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                :src="item.image_url"
                alt=""
                class="w-48 md:w-32 aspect-square object-cover rounded-lg border border-gray-200"
              />
              <div class="flex flex-col text-center md:text-left">
                <h3 class="text-lg font-bold mb-1 text-[#111218]">
                  {{ item.title }}
                </h3>
                <p class="text-[#616889] text-sm leading-normal">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="flex flex-col items-center text-center mb-16 sm:mb-24" id="openings">
          <p class="text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
            Top 6 Chess Openings
          </p>
          <p class="text-[#616889] text-base md:text-lg font-normal leading-normal mt-4 max-w-3xl">
            Explore the most popular and effective chess openings. Click on any opening
            to see a step-by-step visual guide and learn its core strategy.
          </p>
           <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-10 justify-items-center">
            <div
              v-for="(item, index) in chess_openings"
              @click="()=>{
                showOpening(item)
              }"
              :key="index"
              class="flex cursor-pointer flex-col md:flex-row items-center md:items-center gap-6 p-6 w-full max-w-[30rem] rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div class="border-4 border-blue-500  px-2 rounded-sm">
                <p class="text-blue-500 font-semibold">{{ index+1 }}</p>
              </div>
              <div class="flex flex-col text-center md:text-left">
                <h3 class="text-lg font-bold mb-1 text-[#111218]">
                  {{ item.opening_name }}
                </h3>
                <p class="text-[#616889] text-sm leading-normal">
                  {{ item.short_description }}
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  </div>
 <transition name="fade">
    <div
      v-if="showDialog"
      class="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    >
      <transition name="scale">
        <div
          v-if="showDialog"
          class="relative w-full max-w-4xl max-h-[90vh] grid grid-cols-1 md:grid-cols-2 rounded-xl bg-white  shadow-lg overflow-y-auto"
        >
          
          <button
            @click="showDialog=false"
            class="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-800 z-10"
          >
            <i class="pi pi-times"></i>
          </button>

          <div
            class="flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gray-100 "
          >
            <img
              alt="King movement diagram"
              class="w-full h-auto object-contain rounded-lg border border-gray-200 "
              :src="selected_data.modal_image"
            />
          </div>

          <div class="flex flex-col p-6 sm:p-8 overflow-y-auto">
            <h3 class="text-2xl font-bold text-[#111218]  mb-4">
              The {{ selected_data.piece_name }}
            </h3>

            <div class="space-y-4 text-[#616889]  text-sm leading-relaxed">
            <div v-for="(item,index) in selected_data.piece_info">

                
                <h4 class="text-base font-bold text-[#111218] ">
               {{item.heading}}
              </h4>
              <p>
               {{ item.description }}
              </p>
        </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
 <transition name="fade">
    <div
      v-if="showOpeningDialog"
      class="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    >
      <transition name="scale">
        <div
          v-if="showOpeningDialog"
          class="relative w-full max-w-4xl max-h-[90vh] grid grid-cols-1 md:grid-cols-2 rounded-xl bg-white  shadow-lg overflow-hidden"
        >
          
          <button
            @click="()=>{
                showOpeningDialog=false;
                boardApi?.resetBoard()
                selected_opening={}
            }"
            class="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-800 z-10"
          >
            <i class="pi pi-times"></i>
          </button>

          <div
            class="flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gray-100 "
          >
             <TheChessboard @board-created="(api) => (boardApi = api)"  :board-config="boardConfig" class="w-[300px] lg:w-auto [h-300px] lg:h-auto"
         />
          </div>

          <div class="flex flex-col p-6 sm:p-8 overflow-y-auto">
            <h3 class="text-2xl font-bold text-[#111218]  mb-4">
              {{ selected_opening.opening_name }}
            </h3>

            <div class="space-y-4 text-[#616889]  text-sm leading-relaxed mt-2">
                <p>{{ selected_opening.long_description }}</p>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>



<script setup>
import { TheChessboard } from "vue3-chessboard";
import { Chess } from "chess.js";
import "vue3-chessboard/style.css";
let boardApi;
const showDialog=ref(false)
const route = useRoute()
const showOpeningDialog=ref(false)
const base = useRuntimeConfig().app.baseURL
const selected_data= ref({})
const selected_opening = ref({})
const boardConfig = ref({
    coordinates:true,
  viewOnly:true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
})
let interval = null;

const game = new Chess();
const idx = ref(0)
async function showOpening(item){
    idx.value=0
    selected_opening.value = item
    showOpeningDialog.value = true
    let moves = item.moves_list
    moves.forEach((el, index) => {
  setTimeout(() => {
    boardApi.move(el);

    if (game.turn === 'w') {
      game.setTurn('b');
    } else {
      game.setTurn('w');
    }
  }, index * 2500); 
});
}

onMounted(()=>{
   if (route.query.scrollTo) {
    const el = document.getElementById(route.query.scrollTo)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }
})


const chess_openings =ref([
  {
    opening_name: "Ruy López (Spanish Opening)",
    moves_list: ["e4", "e5", "Nf3", "Nc6", "Bb5"],
    short_description:
      "A timeless opening where White pressures the knight defending Black’s central pawn.",
    long_description:
      "The Ruy López, also known as the Spanish Opening, is a cornerstone of classical chess strategy. By developing the bishop to b5, White targets the knight that protects the e5 pawn, creating long-term positional tension. The opening promotes steady development, early castling, and strong control of the center. It can lead to both sharp tactical fights and quiet maneuvering battles depending on the variation chosen. Its enduring popularity across centuries makes it a must-know opening for players of all levels."
  },
  {
    opening_name: "Italian Game",
    moves_list: ["e4", "e5", "Nf3", "Nc6", "Bc4"],
    short_description:
      "A simple and direct opening focused on quick development and central dominance.",
    long_description:
      "The Italian Game is one of the oldest and most instructive openings in chess. White develops rapidly, targeting the f7 square while keeping open lines for the queen and bishop. The early development allows for both attacking chances and smooth king safety through castling. Its open nature encourages tactical play and teaches beginners key principles of opening theory. The Italian Game remains a top choice for players who value clarity, activity, and control of the center."
  },
  {
    opening_name: "Sicilian Defense",
    moves_list: ["e4", "c5"],
    short_description:
      "Black’s most aggressive answer to 1.e4, aiming for asymmetry and counterplay.",
    long_description:
      "The Sicilian Defense is a powerhouse opening that leads to dynamic and unbalanced positions. By playing 1...c5, Black immediately challenges White’s center and avoids the symmetrical pawn structure of 1...e5. The resulting positions are rich in tactical possibilities, where both sides can play for a win from the very start. Variations like the Najdorf, Dragon, and Scheveningen offer deep theoretical exploration. Its fighting nature makes it a favorite weapon among grandmasters and ambitious club players alike."
  },
  {
    opening_name: "Queen’s Gambit",
    moves_list: ["d4", "d5", "c4"],
    short_description:
      "A strategic opening where White offers a pawn to gain long-term control of the center.",
    long_description:
      "The Queen’s Gambit is one of the most respected openings in chess, played at every level of competition. White temporarily sacrifices a pawn to distract Black’s central pawn and gain better space and mobility. If Black accepts, White can often recover the pawn with improved control and development. It leads to rich, strategic battles focused on pawn structure and long-term planning. This opening’s classical elegance and depth have made it a staple of world championship play for over a century."
  },
  {
    opening_name: "French Defense",
    moves_list: ["e4", "e6", "d4", "d5"],
    short_description:
      "A solid and resilient defense where Black challenges White’s center with ...d5.",
    long_description:
      "The French Defense is a strong, counterattacking setup that emphasizes pawn structure and long-term planning. Black begins by preparing ...d5, immediately contesting the center and creating tension. The resulting closed positions often revolve around pawn chains and strategic maneuvering. While Black’s light-squared bishop is slightly restricted, the defense provides stability and counterplay opportunities. It appeals to players who prefer solid, strategic play over risky tactics."
  },
  {
    opening_name: "King’s Indian Defense",
    moves_list: ["d4", "Nf6", "c4", "g6"],
    short_description:
      "A hypermodern defense that lets White occupy the center before counterattacking dynamically.",
    long_description:
      "The King’s Indian Defense is one of the most popular and dynamic responses to 1.d4. Black allows White to occupy the center early, planning to strike back later with pawn breaks like ...e5 or ...c5. The resulting positions often feature sharp kingside attacks for Black and queenside counterplay for White. It requires strong understanding of timing, pawn structure, and coordination of pieces. Known for its complexity and fighting spirit, it has been a favorite of attacking players like Garry Kasparov."
  }
])
const more_data = ref([
    {
        image_url:`${base}/icons/checkmate.jpg`,
        title: 'Checkmate',
        description:'This is the ultimate goal in chess. A king is in checkmate when it is under attack (in "check") and has no legal move to escape. The game ends, and the player delivering the checkmate wins.'
    },
    {
        image_url:`${base}/icons/stalemate.jpg`,
        title: 'Stalemate',
        description:'A stalemate occurs when a player is not in check but has no legal moves to make. The game ends in a draw, meaning neither player wins or loses.'
    },
    {
        image_url:`${base}/icons/draw.png`,
        title: 'Draw',
        description:'Besides stalemate, a game can be a draw in several other ways, such as by mutual agreement, threefold repetition of a position, or the fifty-move rule (no captures or pawn moves in 50 moves).'
    },
    {
        image_url:`${base}/icons/resign.jpg`,
        title: 'Resign',
        description:"A player may choose to resign if they believe their position is hopeless. This immediately ends the game, and the opponent wins. It's a sign of good sportsmanship to know when to resign."
    },
])
const card_data= ref([
  {
    piece_name: "Pawn",
    image_url: `${base}/icons/pawn.png`,
    modal_image:`${base}/icons/pawn_modal.png`,
    piece_info: [
      {
        heading: "Movement & Capturing",
        description:
          "Pawns move forward one square but capture diagonally. On their first move, they may advance two squares forward if both are unoccupied. They cannot move backward or capture straight ahead."
      },
      {
        heading: "Special Rules",
        description:
          "Pawns have two unique abilities — En Passant and Promotion. En Passant allows a pawn to capture another pawn that just advanced two squares past it. When a pawn reaches the opposite end of the board, it must be promoted to a Queen, Rook, Bishop, or Knight of the same color."
      }
    ]
  },
  {
    piece_name: "Knight",
    image_url: `${base}/icons/knight.png`,
     modal_image:`${base}/icons/knight_modal.png`,
    piece_info: [
      {
        heading: "Movement & Capturing",
        description:
          "The Knight moves in an L-shape — two squares in one direction (horizontal or vertical) and then one square perpendicular to that. It is the only piece that can jump over other pieces on the board."
      },
      {
        heading: "Strategic Use",
        description:
          "Knights are strongest in closed positions where pawns block long-range pieces. They are excellent at controlling key central squares and can create powerful forks, attacking multiple pieces at once."
      }
    ]
  },
  {
    piece_name: "Bishop",
    image_url: `${base}/icons/bishop.png`,
     modal_image:`${base}/icons/bishop_modal.png`,
    piece_info: [
      {
        heading: "Movement & Capturing",
        description:
          "Bishops move diagonally across the board for any number of unoccupied squares. They capture by moving to the square occupied by an opponent’s piece along the same diagonal."
      },
      {
        heading: "Strategic Use",
        description:
          "Each player begins with two bishops — one on light squares and one on dark. Because bishops are confined to their color, they work best in pairs and excel in open positions with long diagonal lines."
      }
    ]
  },
  {
    piece_name: "Rook",
    image_url: `${base}/icons/rook.png`,
     modal_image:`${base}/icons/rook_modal.png`,
    piece_info: [
      {
        heading: "Movement & Capturing",
        description:
          "Rooks move any number of squares vertically or horizontally. They capture by moving to a square occupied by an opponent’s piece along the same rank or file."
      },
      {
        heading: "Special Move — Castling",
        description:
          "The Rook participates in a special move with the King called castling. This move helps safeguard the King while activating the Rook, but it can only occur if neither piece has previously moved and no squares between them are occupied or under attack."
      }
    ]
  },
  {
    piece_name: "Queen",
    image_url: `${base}/icons/queen.png`,
     modal_image:`${base}//queen_modal.png`,
    piece_info: [
      {
        heading: "Movement & Capturing",
        description:
          "The Queen is the most powerful piece on the board. She can move any number of squares horizontally, vertically, or diagonally, combining the abilities of both the Rook and Bishop."
      },
      {
        heading: "Strategic Use",
        description:
          "Because of her range, the Queen is central to both attack and defense. However, using her too early can make her vulnerable. It’s often best to develop minor pieces first and activate the Queen after the position is stable."
      }
    ]
  },
  {
    piece_name: "King",
    image_url:  `${base}/icons/king.png`,
     modal_image:`${base}/icons/king_modal.png`,
    piece_info: [
      {
        heading: "Movement & Capturing",
        description:
          "The King is one of the weakest pieces. It can move one square in any direction — horizontally, vertically, or diagonally. A King cannot move into a square that is under attack by an opponent’s piece (moving into check)."
      },
      {
        heading: "Check & Checkmate",
        description:
          "When a King is under attack, it is in check. The player must make a move to get the King out of check. If there is no legal move to escape the check, it is checkmate — the game is over."
      }
    ]
  }
])
</script>