import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'format',
  standalone: true,
})
export class FormatPipe implements PipeTransform {
  transform(text: string): unknown {
    // if the text is empty, return it untouched
    if (typeof text === 'undefined') return text;
    // check if there is a filter object, transform it to a string
    if (typeof text === 'object') {
      if ('Value' in text) {
        text = text['Description'] ? `${text['Value']} (${text['Description']})` : text['Value'];
      } else {
        return text;
      }
    }
    // we only process if we have a string, not a boolean or number
    if (typeof text !== 'string') return text;

    // Regular expression pattern to match URLs
    const urlPattern = /(https?:\/\/\S+)/g;

    // Find all URLs in the text
    const urls = text.match(urlPattern);

    // Iterate over the URLs and wrap each one with an <a> tag
    if (urls) {
      urls.forEach(url => {
        const link = `<a href="${url}" target="blank">${url}</a>`;
        text = text.replace(url, link);
      });
    }

    return text;
  }
}
