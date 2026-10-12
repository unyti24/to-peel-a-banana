const welcomeScreen = document.querySelector('#welcome');
const tutorialScreen = document.querySelector('#tutorial');
const finishScreen = document.querySelector('#finish');
const startBtn = document.querySelector('#startBtn');
const restartBtn = document.querySelector('#restartBtn');
const homeLink = document.querySelector('#homeLink');
const previousBtn = document.querySelector('#previousBtn');
const nextBtn = document.querySelector('#nextBtn');
const stepCount = document.querySelector('#stepCount');
const progressPercent = document.querySelector('#progressPercent');
const progressTrack = document.querySelector('#progressTrack');
const progressBar = document.querySelector('#progressBar');
const stepConnector = document.querySelector('#stepConnector');
const stepTitle = document.querySelector('#stepTitle');
const stepInstruction = document.querySelector('#stepInstruction');
const stepExtra = document.querySelector('#stepExtra');
const safetyNote = document.querySelector('#safetyNote');
const stepImage = document.querySelector('#stepImage');
const imageCaption = document.querySelector('#imageCaption');
const footerStep = document.querySelector('#footerStep');

const steps = [
  {
    connector: 'First', title: 'Wash Your Hands',
    instruction: 'Wash your hands before starting.',
    extra: 'You must have clean hands.',
    image: 'images/step1.jpg', alt: 'Hands being washed with soap and water',
    caption: 'Start with clean hands.'
  },
  {
    connector: 'Next', title: 'Prepare the Materials',
    instruction: 'Get a green plantain, a small knife, and a cutting board.',
    extra: 'You need to work on a stable surface.',
    image: 'images/step2.jpg', alt: 'A whole green cooking plantain and a small knife on a cutting board',
    caption: 'Prepare everything before you begin.'
  },
  {
    connector: 'Then', title: 'Cut Off the Ends',
    instruction: 'Carefully cut off both ends of the plantain.',
    extra: '', safety: 'Be careful when using the knife.',
    image: 'images/step3.jpg', alt: 'A green plantain with both ends cut off beside a small kitchen knife',
    caption: 'Cut both ends on the cutting board.'
  },
  {
    connector: 'After that', title: 'Make Shallow Cuts',
    instruction: 'Make two or three shallow cuts along the length of the peel.',
    extra: 'Do not cut too deeply into the plantain.',
    image: 'images/step4.jpg', alt: 'A green plantain with shallow lengthwise cuts in its thick green peel',
    caption: 'Score the peel without cutting deeply.'
  },
  {
    connector: 'Next', title: 'Loosen the Peel',
    instruction: 'Use your fingers to gently loosen one section of the peel.',
    extra: '',
    image: 'images/step5.jpg', alt: 'Fingers carefully lifting one edge of the green plantain peel',
    caption: 'Lift one edge of the peel gently.'
  },
  {
    connector: 'Then', title: 'Remove the Peel',
    instruction: 'Pull the peel away from the plantain, one section at a time.',
    extra: 'You have to remove the thick green peel carefully.',
    image: 'images/step6.jpg', alt: 'A hand pulling a thick section of green plantain peel away from the pale plantain',
    caption: 'Remove the thick peel one section at a time.'
  },
  {
    connector: 'After that', title: 'Remove the Remaining Skin',
    instruction: 'Remove any remaining pieces of peel from the plantain.',
    extra: '',
    image: 'images/step7.jpg', alt: 'A mostly peeled cooking plantain with a small piece of green peel remaining',
    caption: 'Check the plantain for leftover peel.'
  },
  {
    connector: 'Finally', title: 'Clean Up',
    instruction: 'Put the peel in the trash and clean your cutting board.',
    extra: 'Now your green plantain is ready to cook!',
    image: 'images/step8.jpg', alt: 'A peeled cooking plantain and green peel on a cutting board beside a waste bin',
    caption: 'Clean your workspace when you finish.'
  }
];

let currentStep = 0;

function showScreen(screenToShow) {
  [welcomeScreen, tutorialScreen, finishScreen].forEach((screen) => {
    screen.classList.toggle('active', screen === screenToShow);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderStep() {
  const step = steps[currentStep];
  const stepNumber = currentStep + 1;
  const percentage = Math.round((stepNumber / steps.length) * 100);

  stepCount.textContent = `Step ${stepNumber} of ${steps.length}`;
  progressPercent.textContent = `${percentage}%`;
  progressTrack.setAttribute('aria-valuenow', String(stepNumber));
  progressBar.style.width = `${percentage}%`;
  stepConnector.textContent = step.connector;
  stepTitle.textContent = step.title;
  stepInstruction.textContent = step.instruction;
  stepExtra.textContent = step.extra;
  stepExtra.hidden = !step.extra;
  safetyNote.textContent = step.safety ? `⚠ ${step.safety}` : '';
  safetyNote.hidden = !step.safety;
  stepImage.src = step.image;
  stepImage.alt = step.alt;
  imageCaption.textContent = step.caption;
  footerStep.textContent = `${String(stepNumber).padStart(2, '0')} / ${String(steps.length).padStart(2, '0')}`;
  previousBtn.disabled = currentStep === 0;
  nextBtn.innerHTML = currentStep === steps.length - 1
    ? 'Finish Tutorial <span aria-hidden="true">✓</span>'
    : 'Next <span aria-hidden="true">→</span>';
}

function startTutorial() {
  currentStep = 0;
  renderStep();
  showScreen(tutorialScreen);
}

startBtn.addEventListener('click', startTutorial);
restartBtn.addEventListener('click', startTutorial);
previousBtn.addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep -= 1;
    renderStep();
  }
});
nextBtn.addEventListener('click', () => {
  if (currentStep < steps.length - 1) {
    currentStep += 1;
    renderStep();
  } else {
    showScreen(finishScreen);
  }
});
homeLink.addEventListener('click', (event) => {
  event.preventDefault();
  showScreen(welcomeScreen);
});

renderStep();
