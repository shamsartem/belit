import { belToBelit } from './belit'

const belInputEl = document.getElementById('belInput') as HTMLTextAreaElement
const resultEl = document.getElementById('result') as HTMLDivElement
resultEl.innerHTML = belToBelit(belInputEl.value)

const autoGrow = (textarea: HTMLTextAreaElement) => {
  textarea.style.height = '5px'
  textarea.style.height = textarea.scrollHeight + 'px'
}

autoGrow(belInputEl)

addEventListener('resize', () => {
  autoGrow(belInputEl)
})

belInputEl.addEventListener('input', () => {
  autoGrow(belInputEl)
  resultEl.innerHTML = belToBelit(belInputEl.value)
})
