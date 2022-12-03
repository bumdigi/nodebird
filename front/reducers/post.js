export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: 'bumdigi',
      },
      content: 'hello #해시태그 #인스타#안녕',
      Images: [{ src: '' }, { src: '' }, { src: '' }],
      Comments: [
        {
          User: {
            nickname: 'atom',
          },
          content: 'hi atom',
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

// case 문에서 ADD_POST 오타가 났을 경우 에러가 나므로 이렇게 변수로 선언해 주는게 좋다.
const ADD_POST = 'ADD_POST';
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: '더미데이터입니다.',
  User: {
    id: 1,
    nickname: '범디기',
  },
  Images: [
    {
      src: 'https://picsum.photos/200/300',
    },
    {
      src: 'https://picsum.photos/200/300',
    },
    {
      src: 'https://picsum.photos/200/300',
    },
  ],
  Comments: [
    {
      User: {
        nickname: 'mingry',
      },
      content: '우와',
    },
    {
      User: {
        nickname: 'groom',
      },
      content: '냐옹',
    },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
