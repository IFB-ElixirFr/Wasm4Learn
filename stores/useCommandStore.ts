import { defineStore } from 'pinia'


export const useCommandStore = defineStore('commandStore', () => {
    const command = ref(null)
    const changed = ref(false)

    const changedTest = ref(false)
    const resultTest = ref(null)
    const resultTestChanged = ref(false)
    const testID = ref(null)

    async function updateCommand(newCommand) {
        command.value = newCommand
        changed.value = true
    }

    function setResultTest(result) {
        resultTest.value = result;
        resultTestChanged.value = true;
    }

    async function updateCommandTest(newCommand, id) {
        command.value = newCommand
        changedTest.value = true
        testID.value = id;
    }

    function reset() {
        command.value = null;
        changed.value = false;

        changedTest.value = false;
        resultTestChanged.value = false;
        resultTest.value = null;
        testID.value = null;
    }
    
    return {
        // States
        command,
        changed,
        changedTest,
        resultTest,
        resultTestChanged,
        testID,
        // Functions
        reset,
        updateCommand,
        updateCommandTest,
        setResultTest

    }
})