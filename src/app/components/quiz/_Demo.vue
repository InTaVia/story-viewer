
<template>

    <div class="native-scroll-container">
        <div class="quiz-wrapper">
            <!-- 
                Place Quiz Component anywhere in your App
                Quiz Component expects following Props:
                :quiz-ids -> ["4", "5"], as an Array
                :is-teleported -> Object with 2 default options: 
                                toElement - DOM element, where your buttons will be teleported, 
                                disabled - boolean
                :show-extended-solution -> boolean
                :show-end-quiz-item-button -> boolean
                :show-quiz-review="true" -> boolean, Show quiz review after quiz was answered
                @quiz-end -> listens to the child's event. Will be triggered, when all Quiz Items in Quiz Array were answered via -> submitAnswerBtn
                            it also returns quiz data as an argument
            -->

            <quiz 
                :quiz-ids="['1', '2', '3', '4', '5', '6', '7', '9']"
                :is-teleported="{toElement: '#app', disabled: true}"
                :show-extended-solution="false"
                :show-end-quiz-item-button="false"
                :show-quiz-review="true"
                :save-data-in-visitor-state="true"
                @quiz-end="quizEnd">
            </quiz>
        </div>
    </div>

</template>

<script>

// import quiz component
import Quiz from './Quiz.vue';

// Custom App component path: 
// import Quiz from './../components/quiz/Quiz.vue';

export default {
	components: {
        Quiz
    },
    props: {
        quizIds : {
            type: Array,
            default: []
        }
    },
	data(){
        return {
            
        }
    },
	computed: {
	},
	watch: {
	},
    methods: {
        quizEnd(data) {
            console.log('quiz array was finsihed');
            console.log(data);
        }
    },
	created: function(){
	},
	mounted: function(){	
	}
};




</script>





<style scoped>

    .native-scroll-container {
        position: relative;

        width: 100%;
        height: 100%;

        overflow-y: scroll;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
    }

    .quiz-wrapper {
        width: 90%;
        margin: 2rem auto;
        padding-bottom: 100vh;
    }

</style>