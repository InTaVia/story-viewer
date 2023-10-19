
<template>

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
        :quiz-ids="['14', '15', '16', '18', '30', '31', '32', '33', '34']"
        :is-teleported="{toElement: '.fixed-ui-elements', disabled: false}"
        :show-extended-solution="false"
        :show-end-quiz-item-button="false"
        :show-quiz-review="true"
        :save-data-in-visitor-state="true"
        @quiz-end="quizEnd">
    </quiz>

</template>

<script>

// import quiz component
import Quiz from './../../core/modules/quiz/Quiz.vue';

// Custom App component path: 
// import Quiz from './../components/quiz/Quiz.vue';

export default {

    name: 'QuizCard',
    props: {
        quizIds : {
            type: Array,
            default: []
        }
    },
	components: {
        Quiz
    }
	data() {
		return {

		};
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

</style>