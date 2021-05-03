<template>
    <div 
        ref="dot"
        id="dot" 
        class="dot" 
        :class="{'moving-horizontally': dotMovement === 'emdr-linear'}" 
        :style="`height:${dotSize}px; width:${dotSize}px;`"
    ></div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'Dot',
    computed: {
        ...mapState(['dotSize', 'dotMovement'])
    },
    mounted(){
        const dot = document.getElementById('dot')
        const dotContainer = document.getElementById('dot-container')
        this.$instantiateDot(dot, dotContainer)
    },
    methods:{
        ...mapMutations({
            setDot: 'SET_DOT',
        }),
    },
}
</script>

<style lang="scss" scoped>
.dot{
    // top: 50%;
    // left: 50%;
    transform: translate3d(0px, 277px, 0px);
    background-color: rgb(51, 51, 51);
    display: block;
    border-radius: 50%;
    position: absolute;
}
</style>