import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'nbspAfterPrepositions'
})
export class NbspAfterPrepositionsPipe implements PipeTransform {
  // Список предлогов и союзов
  private prepositionsAndConjunctions = [
    'в', 'на', 'под', 'над', 'к', 'у', 'с', 'со', 'о', 'об', 'при', 'по',
    'за', 'из', 'до', 'от', 'про', 'без', 'через', 'и', 'а', 'но', 'или', 'что', 'как', 'для'
  ];

  transform(value: string): string {
    if (!value) return value;

    // Проверяем, содержит ли строка HTML-теги
    const hasHtmlTags = /<[^>]+>/.test(value);

    if (hasHtmlTags) {
      // Обрабатываем как HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(value, 'text/html');
      this.processNode(doc.body);
      return doc.body.innerHTML;
    } else {
      // Обрабатываем как простую строку
      return this.replaceSpaces(value);
    }
  }

  private processNode(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || '';
      node.textContent = this.replaceSpaces(text);
    } else {
      node.childNodes.forEach(child => this.processNode(child));
    }
  }

  private replaceSpaces(text: string): string {
    const words = text.split(/\s+/);
    if (words.length <= 1) return text;

    return words
      .map((word, index) => {
        if (index > 0) {
          const prevWord = words[index - 1].toLowerCase().replace(/[.,!?;:()]/g, '');
          if (this.prepositionsAndConjunctions.includes(prevWord)) {
            return `\u00A0${word}`; // Неразрывный пробел
          }
        }
        return index === 0 ? word : ` ${word}`; // Обычный пробел
      })
      .join('');
  }
}
