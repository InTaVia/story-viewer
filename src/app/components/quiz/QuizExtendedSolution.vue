<template>
    
    <!-- Submit Btn-->
    <section class="quiz-extended-solution">
        <p v-html="extendedSolution.extended_solution_text"></p>

        <button class="quiz-submit-btn" @click="endQuizItem" v-if="showEndQuizBtn && showEndQuizItemButton">{{getTranslation('continue')}}</button>
    </section> 
    
</template>


<script>


    // Example of expected DB:
    // quiz_content_extended_solution[{'extended_solution_text' : 'Lorem ipsum', 'extended_solution_image' : [{'url' : '...'}] }]

    export default {
        props: {
            quizId : {
                type: String,
                default: ""
            },
            extendedSolution: {
                type: Object,
                default: undefined
            },
            showEndQuizItemButton: {
                type: Boolean,
                default: true
            }
        },
        emits: ['endQuizItem'],
        data() {
            return {
                showEndQuizBtn: true
            };
        },
        computed: {
        },
        watch: {
        },
        methods: {
            endQuizItem: function(){
                // emit event - "quiz end"
                let quizId = this.quizId;
                this.showEndQuizBtn = false;
                this.$emit('endQuizItem', { quizId });
            }
        },
        created: function(){
        },
        mounted: function(){	
        }
    };




</script>


<style lang="less">


</style>