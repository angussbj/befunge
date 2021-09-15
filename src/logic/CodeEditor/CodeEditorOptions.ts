export class CodeEditorOptions {
  public useSelectionDirectionForCutCopyPaste =
    localStorage.getItem("useSelectionDirectionForCutCopyPaste") === "true";
  public changeDirectionOnDirectionCharacters =
    localStorage.getItem("changeDirectionOnDirectionCharacters") === "true";

  public setChangeDirectionOnDirectionCharacters(newValue: boolean): void {
    this.changeDirectionOnDirectionCharacters = newValue;
    localStorage.setItem(
      "changeDirectionOnDirectionCharacters",
      newValue ? "true" : "false"
    );
  }

  public setUseSelectionDirectionForCutCopyPaste(newValue: boolean): void {
    this.useSelectionDirectionForCutCopyPaste = newValue;
    localStorage.setItem(
      "useSelectionDirectionForCutCopyPaste",
      newValue ? "true" : "false"
    );
  }
}
