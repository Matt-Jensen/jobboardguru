import { ReactNode, FunctionComponent, useEffect, useRef } from 'react'
import progress from '../../common/services/progress';
import styles from './styles.module.scss';

const UNCOUNTED_INPUT_TYPES = ['checkbox', 'hidden'];

type Props = {
  children?: ReactNode
  legalCopy?: string,
  onLoad?: (form: any) => void
  onSubmit?: (evt: any) => void
}

const Form: FunctionComponent<Props> = ({ children, legalCopy, onLoad, onSubmit }) => {
  const formElement = useRef(null);

  const updateFormProgress = (form: any) => {
    const countable = Array.from(form.elements)
      .map(el => el as HTMLElement)
      .filter((el) =>
      el.tagName === 'INPUT' && !UNCOUNTED_INPUT_TYPES.includes(el.getAttribute('type') || ''));
    const total = countable.length || 1;
    // @ts-ignore
    const answered = countable.filter(el => Boolean(el.value)).length;
    progress.update(answered / total);
  }

  // Publish form completion progress
  const onProgressChange = (evt: any): void => {
    const form = evt.target.closest('form') as HTMLFormElement;
    if (!form) return;
    updateFormProgress(form);
  };

  useEffect(() => {
    // Fire on load event
    window.setTimeout(() => requestAnimationFrame(() => {
      const formEl = formElement.current;
      if (onLoad) onLoad(formEl)
      updateFormProgress(formEl); // Trigger progress update on load
    }), 400);

    // update out of sync progress
    window.addEventListener('fnp:progress_updated', () => requestAnimationFrame(() => {
      updateFormProgress(formElement.current);
    }))
  }, [])

  return <form
    className={styles.container}
    onSubmit={onSubmit}
    onChange={onProgressChange}
    ref={formElement}>
    {children}
    {legalCopy && <small className={styles.legalCopy}>{legalCopy}</small>}
  </form>
}

Form.defaultProps = {
  legalCopy: '',
  onLoad: () => {}, // noop
  onSubmit: () => {}, // noop
};

export default Form;
