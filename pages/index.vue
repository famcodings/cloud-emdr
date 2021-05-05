<template>
  <div class="is-relative">
    <Navbar/>
    <div class="container is-fluid is-fullhd" :class="{'p-0': !isSettingsOpen, 'pr-0': isSettingsOpen}">
        <div class="columns">
            <div v-if="isSettingsOpen" class="column is-one-third pr-0">
                <Settings/>
            </div>
            <div id="dot-container" class="column is-relative mt-3" :style="`background:${background}`">
                <Dot/>
            </div>
        </div>
    </div>
    <div v-if="!isSettingsOpen" class="floating-container info-block">
        <button class="button primary-btn" @click="toggleStartDotMove">{{isDotMoving?'Stop':'Start'}}</button>
        <button class="button" @click="setIsSettingOpen(!isSettingsOpen)"><i class="fa fa-cog"></i></button >
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions  } from 'vuex'
import Navbar from '@/components/layout/Navbar.vue'
import Settings from '@/components/Settings.vue'
import Dot from '@/components/Dot.vue'
export default {
    components: {Navbar,Settings, Dot},
   
    computed: {
        ...mapState(['isSettingsOpen', 'isDotMoving', 'background'])
    },
    methods: {
        ...mapActions({
            toggleStartDotMove: 'toggleStartDotMove',
            setIsSettingOpen: 'setIsSettingOpen',
        }),
    },
}
</script>

<style lang="scss" scoped>
    .floating-container{
        margin-bottom: 0px;
        position: absolute;
        bottom: 1rem;
        left: 1rem;
    }
    #dot-container{
        height: calc(100vh - 60.5px);
        width: 100wh;
        z-index: -1;
        background-repeat: no-repeat !important;
        background-size: cover !important;
        background-position: center !important;
    }
</style>
