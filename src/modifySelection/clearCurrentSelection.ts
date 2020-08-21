export function clearCurrentSelection(): void {
  const selection = document.getSelection();
  selection.removeAllRanges();
}
