const controls = document.querySelector('.note-controls');
const topicButtons = [...controls.querySelectorAll('[data-topic]')];
const search = controls.querySelector('input[type="search"]');
const notes = [...document.querySelectorAll('.note-item')].map((element) => ({
  element,
  topic: element.querySelector('.topic-label').textContent.trim(),
  text: [...element.querySelectorAll('.note-title, .note-summary, .topic-label')]
    .map((part) => part.textContent.trim()).join(' ').toLowerCase(),
}));
const emptyState = document.querySelector('.empty-state');
const resultsStatus = document.querySelector('#results-status');

let selectedTopic = '';

function filterNotes() {
  const terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  let visibleCount = 0;

  for (const note of notes) {
    const matchesTopic = !selectedTopic || note.topic === selectedTopic;
    const matchesSearch = terms.every((term) => note.text.includes(term));
    note.element.hidden = !(matchesTopic && matchesSearch);
    if (!note.element.hidden) visibleCount += 1;
  }

  emptyState.hidden = visibleCount > 0;
  resultsStatus.textContent = visibleCount ? `显示 ${visibleCount} 篇笔记` : '没有找到匹配的笔记';
}

for (const button of topicButtons) {
  button.addEventListener('click', () => {
    selectedTopic = button.dataset.topic;
    for (const option of topicButtons) {
      option.setAttribute('aria-pressed', String(option === button));
    }
    filterNotes();
  });
}

search.value = '';
search.addEventListener('input', filterNotes);
controls.hidden = false;
