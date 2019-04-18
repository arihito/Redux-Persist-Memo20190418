import { createStore } from 'redux';

const initData = {
  data: [{ message: 'sample data', created: new Date() }],
  message: 'please type message:',
  mode: 'default',
  fdata: []
}

// Reducer
export function memoReducer(state = initData, action) {
  switch (action.type) {
    case 'ADD':
      return addReduce(state, action);

    case 'DELETE':
      return deleteReduce(state, action);

    case 'FIND':
      return findReduce(state, action);

    default:
      return state;
  }
}

// Reduce Action

// Memo追加のReduce処理
function addReduce(state, action) {
  let data = {
    message: action.message,
    created: new Date()
  };
  // オブジェクトを配列に変換
  let newdata = state.data.slice();
  // 配列の先頭に追加
  newdata.unshift(data);
  return {
    data: newdata,
    message: 'Added!',
    mode: 'default',
    fdata: []
  };
}

// Memo検索のReduce処理
function findReduce(state, action) {
  let f = action.find;
  let fdata = [];
  state.data.forEach((value) => {
    if (value.message.indexOf(f) >= 0) {
      // 配列の最後に追加
      fdata.push(value)
    }
  });
  return {
    data: state.data,
    message: 'find "' + f + '":',
    modoe: 'find',
    fdata: fdata
  };
}

// Memo削除のReduce処理
function deleteReduce(state, action) {
  let newdata = state.data.slice();
  newdata.splice(action.inedx, 1);
  return {
    data: newdata,
    message: 'delete "' + action.index + '":',
    meode: 'delete',
    fdata: []
  }
}

// ActionCreator

// Memo追加のAction
export function addMemo(text) {
  return {
    type: 'ADD',
    message: text
  }
}

// Memo削除のAction
export function deleteMemo(num) {
  return {
    type: 'DELETE',
    index: num
  }
}

// Memo検索のAction
export function findMemo(text) {
  return {
    type: 'FIND',
    index: text
  }
}

// Storeを作成
export default createStore(memoReducer);