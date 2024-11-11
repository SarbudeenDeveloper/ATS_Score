import pdfToText from 'react-pdftotext'

export async function parsePDF(file: File): Promise<string> {
  try {
    const fullText = await pdfToText(file);
    console.log(fullText);
    return fullText.trim();
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF file');
  }
}