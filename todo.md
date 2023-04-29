- [x] Sidebar icons are not centered. They do not align with the hamburger menu. Text width is zero.
- [x] Toggle Active state in sidebar.
- [ ] Picker is firing click of the document upon resizing, leading to premature-closing.
- [ ] Navbar hover on closed State.
- [ ] Billabe line-height issues. Probable solution: Capsizecss
- [ ] documentFragment for better perf???
- [ ] Layout shift on resetting tag and project tracker. ( Solution : replaceChildren instead of replacing the entire element, have a prefixed width)
- [x] Use replaceWith() instead of innerHTML or replaceChildren()
- [x] Refactor ProjectPicker component
- [x] Something is wrong with the projectButton Event Listener.
- [x] Delete event is fired when in the input field of the picker. BAKA BAKA BAKA!!!!!!!! Look at alternate solutions before going on your own.
- [x] Edge case: When there is filter and li is clicked, picker.remove() throws error.
- [x] clear projectFilter onBlur
- [x] Parent Blur event to be prevented when child is clicked.
- [ ] Tag Picker get other tag data when the picker is open and someother tag is clicked.
- [ ] Tag picker is not closed when project button is clicked.
- [x] Creating new entry after discard fails.

# Doubts:

1. How to avoid document level event listeners?
2. How to avoid module level variables? / Best practices
3. Auto-resizing input.
