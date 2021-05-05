export const state = () => ({
    isSettingsOpen: true,
    dot: null,
    dotSize: 40,
    dotSpeed: 1000,
    dotMovement: 'emdr-linear',
    isDotMoving: false,
    background: '#fff',
    dotColor: '#333333',
    colorChangingDot: false,
    colors: ['red', 'green', 'blue', 'yellow'],
    interval: null,
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
    SET_BACKGROUND(state, value) {
        state.background = value
    },
    SET_DOT_COLOR(state, value) {
        state.dotColor = value
    },
    SET_COLOR_CHANGING_DOT(state, value) {
        state.colorChangingDot = value
    },
    SET_INTERVAL(state, value) {
        state.interval = value
    },
}

export const actions = {
    setIsSettingOpen({commit}, value){
        commit('SET_IS_SETTING_OPEN', value)
    },
    setDotSpeed ({commit, state,}, newSpeed) {
        commit('SET_DOT_SPEED', newSpeed)
        this.$getDot().setSpeed(newSpeed)
    },
    setDotMovement ({commit, state,}, value) {
        commit('SET_DOT_MOVEMENT', value)
        this.$getDot().setMovementMode(value)
    },
    toggleColorChangingDot({commit, state, dispatch}, value) {
        commit('SET_COLOR_CHANGING_DOT', value)
        console.log('value', value)
        if(value){
            let colorIndex = 0// Math.floor(Math.random() * (3 - 0 + 1)) + 0;
            const interval = setInterval(() => {
                colorIndex = colorIndex === 3 ? 0 : colorIndex + 1
                if(state.isDotMoving){
                    commit('SET_DOT_COLOR', state.colors[colorIndex])
                }
            }, 900);
            commit('SET_INTERVAL', interval)
        }else{
            clearInterval(state.interval)
        }
        dispatch('autoAdjustDotColor')
    },
    autoAdjustDotColor({commit, state}){
        if(state.background === '#fff'){
            commit('SET_DOT_COLOR', '#333333')
        } else if(state.background === '#333333'){
            commit('SET_DOT_COLOR', '#cccccc')
        } else if(state.background === 'url(/img/hospital.jpg)'){
            commit('SET_DOT_COLOR', '#333333')
        } else {
            commit('SET_DOT_COLOR', '#cccccc')
        }
    },
    setBackground ({commit, dispatch}, value) {
        dispatch('autoAdjustDotColor')
        if(value === '#fff' || value === '#333333'){
            commit('SET_BACKGROUND', value)
            return
        }
        commit('SET_BACKGROUND', `url(/img/${value}.jpg)`)
    },
    toggleStartDotMove ({commit, state}) {
        commit('SET_IS_DOT_MOVING', !state.isDotMoving)
        if(state.isSettingsOpen)
            commit('SET_IS_SETTING_OPEN', false)
        if(state.isDotMoving){
            this.$getDot().start()
        }else{
            this.$getDot().stop()
        }
    },
}
