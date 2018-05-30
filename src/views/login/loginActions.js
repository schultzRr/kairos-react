const CHANGE_LOADING_VIEW = 'CHANGE_LOADING_VIEW';

export function onChangeLoadingView() {
  return {
    type: CHANGE_LOADING_VIEW,
    payload: {
      loadingView: false
    }
  }
}

export default {
  onChangeLoadingView
}
