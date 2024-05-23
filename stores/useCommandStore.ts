import { defineStore } from "pinia";

export const useCommandStore = defineStore("commandStore", () => {
  const command = ref(null);
  const changed = ref(false);

  const changedTest = ref(false);
  const resultTest = ref(null);
  const resultTestChanged = ref(false);
  const testID = ref(null);

  async function updateCommand(newCommand) {
    command.value = newCommand;
    changed.value = true;
  }

  /**
   * The function `setResultTest` sets the value of `resultTest` and changes the
   * value of `resultTestChanged` to true.
   * @param result - The `result` parameter is a value that will be assigned to
   * the `resultTest` variable.
   */
  function setResultTest(result) {
    resultTest.value = result;
    resultTestChanged.value = true;
  }

  /**
   * The function `updateCommandTest` updates the command value, sets the
   * changedTest value to true, and assigns a new test ID.
   * @param newCommand - The `newCommand` parameter in the `updateCommandTest`
   * function is the new value that will be assigned to the `command.value`
   * variable.
   * @param id - The `id` parameter in the `updateCommandTest` function is used
   * to specify the identifier of the test that you want to update with the new
   * command. It helps to uniquely identify the test that needs to be modified.
   */
  async function updateCommandTest(newCommand, id) {
    command.value = newCommand;
    changedTest.value = true;
    testID.value = id;
  }

  /**
   * The `reset` function sets various values to their initial state.
   */
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
    setResultTest,
  };
});
