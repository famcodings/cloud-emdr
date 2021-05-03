export const state = () => ({
    isSettingsOpen: true,
    dot: null,
    dotSize: 40,
    dotSpeed: 250,
    dotMovement: 'emdr-linear',
    isDotMoving: false
})
  
export const mutations = {
    SET_DOT(state, value) {
        state.dot = value
    },
    SET_IS_SETTING_OPEN(state, value) {
        state.isSettingsOpen = value
    },
    SET_DOT_SIZE(state, value) {
        state.dotSize = value
    },
    SET_DOT_SPEED(state, value) {
        state.dotSpeed = value
    },
    SET_DOT_MOVEMENT(state, value) {
        state.dotMovement = value
    },
    SET_IS_DOT_MOVING(state, value) {
        state.isDotMoving = value
    },
}

export const actions = {
    setDotSpeed ({commit, state,}, newSpeed) {
        commit('SET_DOT_SPEED', newSpeed)
        this.$getDot().setSpeed(newSpeed)
    },
    setDotMovement ({commit, state,}, value) {
        commit('SET_DOT_MOVEMENT', value)
        this.$getDot().setMovementMode(value)
    },
    toggleStartDotMove ({commit, state}) {
        commit('SET_IS_DOT_MOVING', !state.isDotMoving)
        if(state.isDotMoving){
            this.$getDot().start()
        }else{
            this.$getDot().stop()
        }
    },
}