(function () {
  'use strict';

const form        = document.querySelector('#new-item form');
  const editModal   = document.getElementById('edit-modal');
  const editForm    = editModal.querySelector('form');
  const editTitle   = document.getElementById('edit-title');
  const editCategory = document.getElementById('edit-category');
  const editDesc    = document.getElementById('edit-description');
  const editCancelBtn = editModal.querySelector('.btn-secondary');

  const deleteModal = document.getElementById('delete-modal');
  const deleteName  = document.getElementById('delete-target-name');
  const deleteConfirmBtn = document.getElementById('confirm-delete-btn');
  const deleteCancelBtn  = document.getElementById('cancel-delete-btn');

  const searchInput = document.getElementById('search');
  const toast       = document.getElementById('toast');
  const toastIcon   = toast.querySelector('.toast-icon');
  const toastMsg    = toast.querySelector('.toast-msg');

let activeCard = null;

const sectionByCategory = {
    study:    'study-section',
    sleep:    'sleep-section',
    wellness: 'wellness-section'
  };

  const priorityLabel = {
    low:    { text: 'Prioridad Baja',  badge: 'badge-success' },
    medium: { text: 'Prioridad Media', badge: 'badge-info'    },
    high:   { text: 'Prioridad Alta',  badge: 'badge-danger'  }
  };

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

let toastTimer = null;
  const ICONS = { success: '✓', update: '↻', delete: '✕' };

  function showToast(message, type) {
    type = type || 'success';
    clearTimeout(toastTimer);
    toast.classList.remove('toast--success', 'toast--update', 'toast--delete');
    toast.classList.add('toast--' + type);
    toastIcon.textContent = ICONS[type] || '✓';
    toastMsg.textContent = message;
    toast.hidden = false;
    toastTimer = setTimeout(function () {
      toast.hidden = true;
    }, 2600);
  }

function buildCard(data) {
    const article = document.createElement('article');
    article.className = 'card';

    const prio = priorityLabel[data.priority] || priorityLabel.medium;
    const dateLine = data.date
      ? '<p><strong>Fecha:</strong> ' + escapeHtml(data.date) + '</p>'
      : '';
    const descLine = data.description
      ? '<p>' + escapeHtml(data.description) + '</p>'
      : '';

    article.innerHTML =
      '<h3>' + escapeHtml(data.title) + '</h3>' +
      descLine +
      '<p><span class="badge ' + prio.badge + '">' + prio.text + '</span></p>' +
      dateLine +
      '<p><span class="badge badge-warning">Pendiente</span></p>' +
      '<div class="btn-group">' +
        '<button type="button" class="btn btn-secondary">Editar</button>' +
        '<button type="button" class="btn btn-danger">Eliminar</button>' +
      '</div>';

    return article;
  }

function handleCreate(event) {
    event.preventDefault();

    const title       = document.getElementById('title').value.trim();
    const category    = document.getElementById('category').value;
    const priority    = document.getElementById('priority').value;
    const date        = document.getElementById('date').value;
    const description = document.getElementById('description').value.trim();
    if (!title || !category) {
      showToast('Completa los campos obligatorios', 'delete');
      return;
    }
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Guardando...';
    submitBtn.disabled = true;

    setTimeout(function () {
      const newCard = buildCard({
        title: title,
        category: category,
        priority: priority,
        date: date,
        description: description
      });

      const sectionId = sectionByCategory[category];
      const grid = document.querySelector('#' + sectionId + ' .card-grid');
      if (grid) {
        grid.appendChild(newCard);
        newCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      form.reset();

      showToast('Tarea guardada correctamente · 201 Created', 'success');
    }, 600);
  }

function openEditModal(card) {
    activeCard = card;

    const currentTitle = card.querySelector('h3') ? card.querySelector('h3').textContent : '';
    const paragraphs = card.querySelectorAll('p');
    let currentDesc = '';
    for (let i = 0; i < paragraphs.length; i++) {
      const p = paragraphs[i];
      if (!p.querySelector('.badge') && p.textContent.indexOf('Fecha:') === -1
          && p.textContent.indexOf('Meta:') === -1) {
        currentDesc = p.textContent.trim();
        break;
      }
    }
    const parentSection = card.closest('section');
    let categoryValue = 'study';
    if (parentSection) {
      if (parentSection.id === 'sleep-section')    categoryValue = 'sleep';
      else if (parentSection.id === 'wellness-section') categoryValue = 'wellness';
    }

    editTitle.value = currentTitle;
    editCategory.value = categoryValue;
    editDesc.value = currentDesc;

    if (typeof editModal.showModal === 'function') {
      editModal.showModal();
    } else {
      editModal.setAttribute('open', '');
    }
  }

  function handleEditSubmit(event) {
    event.preventDefault();
    if (!activeCard) return;

    const submitBtn = editForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Actualizando...';
    submitBtn.disabled = true;

    setTimeout(function () {
      const titleEl = activeCard.querySelector('h3');
      if (titleEl) titleEl.textContent = editTitle.value.trim();
      const paragraphs = activeCard.querySelectorAll('p');
      for (let i = 0; i < paragraphs.length; i++) {
        const p = paragraphs[i];
        if (!p.querySelector('.badge')
            && p.textContent.indexOf('Fecha:') === -1
            && p.textContent.indexOf('Meta:') === -1) {
          p.textContent = editDesc.value.trim();
          break;
        }
      }

      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      editModal.close();
      activeCard = null;

      showToast('Tarea actualizada · 200 OK', 'update');
    }, 500);
  }

function openDeleteModal(card) {
    activeCard = card;
    const name = card.querySelector('h3') ? card.querySelector('h3').textContent : 'esta tarea';
    deleteName.textContent = '"' + name + '"';

    if (typeof deleteModal.showModal === 'function') {
      deleteModal.showModal();
    } else {
      deleteModal.setAttribute('open', '');
    }
  }

  function handleConfirmDelete() {
    if (!activeCard) return;

    deleteConfirmBtn.textContent = 'Eliminando...';
    deleteConfirmBtn.disabled = true;

    setTimeout(function () {
      activeCard.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      activeCard.style.opacity = '0';
      activeCard.style.transform = 'scale(0.95)';

      setTimeout(function () {
        if (activeCard && activeCard.parentNode) {
          activeCard.parentNode.removeChild(activeCard);
        }
        activeCard = null;
        deleteConfirmBtn.textContent = 'Sí, eliminar';
        deleteConfirmBtn.disabled = false;
        deleteModal.close();
        showToast('Tarea eliminada · 204 No Content', 'delete');
      }, 250);
    }, 450);
  }

function handleSearch() {
    const term = (searchInput.value || '').trim().toLowerCase();
    const cards = document.querySelectorAll(
      '#study-section .card, #sleep-section .card, #wellness-section .card'
    );

    cards.forEach(function (card) {
      const text = card.textContent.toLowerCase();
      card.style.display = (!term || text.indexOf(term) !== -1) ? '' : 'none';
    });
  }

document.addEventListener('click', function (event) {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const card = target.closest('.card');
    if (card && target.closest('#study-section, #sleep-section, #wellness-section')) {
      if (target.classList.contains('btn-secondary')) {
        openEditModal(card);
      } else if (target.classList.contains('btn-danger')) {
        openDeleteModal(card);
      }
    }
  });

if (form) {
    form.addEventListener('submit', handleCreate);
  }

  if (editForm) {
    editForm.addEventListener('submit', handleEditSubmit);
  }

  if (editCancelBtn) {
    editCancelBtn.addEventListener('click', function () {
      editModal.close();
      activeCard = null;
    });
  }

  if (deleteConfirmBtn) {
    deleteConfirmBtn.addEventListener('click', handleConfirmDelete);
  }

  if (deleteCancelBtn) {
    deleteCancelBtn.addEventListener('click', function () {
      deleteModal.close();
      activeCard = null;
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (editModal.open)   editModal.close();
      if (deleteModal.open) deleteModal.close();
      activeCard = null;
    }
  });
  
})();
