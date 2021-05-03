<template>
   <div class="pr-5 has-border-right-1">
        <h3 class="is-size-4 has-text-weight-semibold">
            Controls
        </h3>
        <p class="pb-2">
            The controls will disappear when you press Start. If you click the <i class="fa fa-cog"></i> below it will appear again. <a href="https://docs.cloudemdr.com/guides/video-call.html">How to use this in a Video Call?</a>
        </p>

        <span class="has-text-weight-medium">Speed</span>
        <div class="field">
            <div class="control">
                <input class="slider is-fullwidth is-small is-info" step="1" min="1" max="2900" :value="dotSpeed" type="range"  @input="handleSpeedInput">
            </div>
        </div>

        <span class="has-text-weight-medium">Size</span>
        <div class="field">
            <div class="control">
                <input class="slider is-fullwidth is-small is-info" step="1" min="40" max="200" :value="dotSize" type="range" @input="handleSizeInput">
            </div>
        </div>
        
        <div class="field">
            <div class="control">
                <label class="checkbox-wrap is-medium pl-0">
                    <input id="check2" type="checkbox" class="d-checkbox">
                    <span></span>
                    Color Changing Dot
                </label>
            </div>
        </div>

        <span class="has-text-weight-medium">Background</span>
        <div class="field">
            <div class="control">
                <div class="select is-medium is-fullwidth">
                    <select>
                        <option value="light">Light Background</option>
                        <option value="dark">Dark Background</option>
                        <option value="practice"> Therapy Practice </option>
                        <option value="forrest"> Forrest </option>
                        <option value="mountains"> Mountains </option>
                        <option value="beach"> Beach </option>
                        <option value="hospital"> Hospital </option>
                        <option value="upload" disabled="disabled"><b> Upload Image (pro users only) </b></option>
                    </select>
                </div>
            </div>
        </div>

        <span class="has-text-weight-medium">Dot Movement</span>
        <div class="field">
            <div class="control">
                <div class="select is-medium is-fullwidth">
                    <select v-model="dotMovementValue" @change="setDotMovement(dotMovementValue)">
                        <option value="emdr-linear">Linear Dot Movement</option>
                        <option value="emdr-non-linear"> 8-shape Dot Movement </option>
                        <option value="random"> Random </option>
                        <option value="diamond" disabled="disabled"> Diamond (pro users only) </option>
                        <option value="diagonal" disabled="disabled"> Diagonal (pro users only) </option>
                        <option value="diagonal-flipped" disabled="disabled"> Diagonal Flipped (pro users only) </option>
                    </select>
                </div>
            </div>
        </div>

        <span class="has-text-weight-medium">Sound</span>
        <div class="field">
            <div class="control">
                <div class="select is-medium is-fullwidth">
                    <select>
                    <option value="none">No Sound</option>
                    <option value="01-EMDR"> Sound 1</option>
                    <option value="PRO-05-EMDR" disabled="disabled"> Sound 2 (pro users only)</option>
                    <option value="PRO-12-EMDR" disabled="disabled"> Sound 3 (pro users only)</option>
                    <option value="PRO-14-EMDR" disabled="disabled"> Sound 4 (pro users only)</option>
                    <option value="PRO-18-EMDR" disabled="disabled"> Sound 5 (pro users only)</option>
                    </select>
                </div>
            </div>
        </div>
        
        <div class="py-5">
            <button class="button primary-btn" @click="toggleStartDotMove">{{isDotMoving?'Stop':'Start'}}</button>
            <button class="button" @click="setIsSettingOpen(!isSettingsOpen)"><i class="fa fa-cog"></i></button >
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    name: 'Settings',
    data: () => ({
        dotMovementValue: 'emdr-linear',
    }),
    computed: {
        ...mapState(['isSettingsOpen', 'dotSize', 'dotSpeed', 'isDotMoving'])
    },
    methods: {
        ...mapMutations({
            setIsSettingOpen: 'SET_IS_SETTING_OPEN',
            setDotSize: 'SET_DOT_SIZE',
        }),
        ...mapActions({
            setDotSpeed: 'setDotSpeed',
            toggleStartDotMove: 'toggleStartDotMove',
            setDotMovement: 'setDotMovement',
        }),
        handleSizeInput(event){
            const newDotSize = event.target.value
            if(newDotSize >= 40 && newDotSize <= 200){
                this.setDotSize(newDotSize)
            }
        },
        handleSpeedInput(event){
            const newDotSpeed = event.target.value
            if(newDotSpeed >= 1 && newDotSpeed <= 2900){
                this.setDotSpeed(newDotSpeed)
            }
        }
    },
}
</script>

<style lang="scss" scoped>
    .has-border-right-1{
        border-right: 1px solid #dedede;
    }
</style>