const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');
const message = document.querySelector('#message');

button.addEventListener('click', function () {
  const chapterText = input.value.trim();

  message.textContent = ''; 

  // 1. Check if input is empty
  if (chapterText === '') {
    input.focus();
    return;
  }

  // 2. Check for Top 10 limit
  if (list.children.length >= 10) {
    message.textContent = 'List is full (10/10).';
    input.value = '';
    input.focus();
    return;
  }

  // 2. Check for duplicates
  const existingItems = Array.from(list.children).map(li => 
    li.textContent.replace('❌', '').trim().toLowerCase()
  );

  if (existingItems.includes(chapterText.toLowerCase())) {
    alert("You already added this chapter!");
    input.value = '';
    input.focus();
    return;
  }

  // 3. Create elements
  const li = document.createElement('li');
  const deleteButton = document.createElement('button');

  li.textContent = chapterText;
  deleteButton.textContent = '❌';
  deleteButton.classList.add('delete');
  deleteButton.setAttribute('aria-label', `Remove ${chapterText}`);

  // 4. Delete event
  deleteButton.addEventListener('click', function () {
    list.removeChild(li);
    input.focus();
  });

  // 5. Append elements
  li.append(deleteButton);
  list.append(li);

  message.textContent = 'Chapter added successfully!';

  // 6. Reset field
  input.value = '';
  input.focus();
});