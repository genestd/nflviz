export const TOGGLE_NAV = 'TOGGLE_NAV';
export const PROCESS_FORM = 'PROCESS_FORM'
export const UPDATE_DIMENSIONS = 'UPDATE_DIMENSIONS'
export const SIZE_CHANGED = 'SIZE_CHANGED'
export const DATA_CHANGED = 'DATA_CHANGED'
export const CHART_CHANGED = 'CHART_CHANGED'

export const toggleNav = () => ({
  type: TOGGLE_NAV
})

export const processForm = (formData) => ({
  type: PROCESS_FORM,
  payload: formData
});

export const updateDimensions = (obj) => ({
  type: UPDATE_DIMENSIONS,
  payload: obj
})

export const sizeChanged = () => ({
  type: SIZE_CHANGED
})

export const dataChanged = () => ({
  type: DATA_CHANGED
})
export const chartChanged = () => ({
  type: CHART_CHANGED
})
