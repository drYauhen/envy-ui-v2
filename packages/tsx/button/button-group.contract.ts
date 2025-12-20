import systemMeta from '../../../system.meta.json';

export type ButtonGroupContract = {
  classNames: {
    root: string;
  };
  dataAttributes: {
    orientation: string;
    orientationValues: {
      horizontal: string | undefined;
      vertical: string;
    };
  };
};

export const buttonGroupContract: ButtonGroupContract = {
  classNames: {
    root: `${systemMeta?.tokens?.prefix ?? 'eui'}-button-group`
  },
  dataAttributes: {
    orientation: 'data-orientation',
    orientationValues: {
      horizontal: undefined,
      vertical: 'vertical'
    }
  }
};
