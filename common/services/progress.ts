const PREFIX = 'common: services: progress:';

export default {
  progress: 0,

  // Update the progress value
  // and trigger a global update event
  update(value: number): void {
    if (value > 1) {
      throw Error(`${PREFIX} update: value may not be larger than 1`);
    }

    if (value < 0) {
      throw Error(`${PREFIX} update: value may not be less than 0`);
    }

    // Ignore no change
    if (this.progress === value) {
      return;
    }

    this.progress = value;
    const event = new CustomEvent('fnp:progress', {detail: this.progress});
    window.dispatchEvent(event);
  },

  // Notify subscribers that the progress
  // is out of date and needs to be updated
  notifyProgressUpdated() {
    const event = new CustomEvent('fnp:progress_updated');
    window.dispatchEvent(event);
  }
}