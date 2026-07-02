import { TextAreaField } from '@/components/ui/TextAreaField';

interface StepOpenQuestionProps {
  fieldId: string;
  question: string;
  value: string;
  onChange: (value: string) => void;
}

/**
 * Wird für die Schritte "Motivation", "Zielgruppe" und "Eignung" verwendet,
 * da sich diese nur in Frage-Text und Feldname unterscheiden.
 */
export function StepOpenQuestion({ fieldId, question, value, onChange }: StepOpenQuestionProps) {
  return <TextAreaField id={fieldId} label={question} value={value} onChange={onChange} />;
}
