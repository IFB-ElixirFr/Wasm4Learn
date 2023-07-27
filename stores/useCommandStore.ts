import { defineStore } from 'pinia'


export const useCommandStore = defineStore('commandStore', () => {
    const command = ref(null)
    const changed = ref(false)

    function updateCommand(newCommand) {
        command.value = newCommand
        changed.value = true
    }

    function reset() {
        command.value = null
        changed.value = false
    }
    return {
        // States
        command,
        changed,
        // Functions
        reset,
        updateCommand

    }
})