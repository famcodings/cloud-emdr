<template>
  <div class="is-relative">
    <Navbar/>
    <div class="container is-fluid is-fullhd">
        <div class="columns">
            <div v-if="isSettingsOpen" class="column is-one-third">
                <Settings/>
            </div>
            <div id="dot-container" class="column is-relative" style="height: calc(100vh - 73.5px); width: 100wh">
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
        ...mapState(['isSettingsOpen', 'isDotMoving'])
    },
    methods: {
        ...mapMutations({
            setIsSettingOpen: 'SET_IS_SETTING_OPEN',
        }),
        ...mapActions({
            toggleStartDotMove: 'toggleStartDotMove',
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
</style>
