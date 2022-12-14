import produce from "immer";

export const initialState = {
  posts: [],
  //content: [],
  commentId: [],
  post: null, // post = {...post, comments:[...comments, '새로운댓글']}
  morePosts: null,

  editing: false,

  loadPostDetailLoading: false,
  loadPostDetailDone: false,
  loadPostDetailError: null,

  loadMoreLoading: false,
  loadMoreDone: false,
  loadMoreError: null,

  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,

  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  updatePostLoading: false,
  updatePostDone: false,
  updatePostError: null,

  removePostLoading: false,
  removePostDone: false,
  removePostError: null,

  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,

  removeCommentLoading: false,
  removeCommentDone: false,
  removeCommentError: null,

  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
};

export const LOAD_POST_DETAIL_REQUEST = "LOAD_POST_DETAIL_REQUEST";
export const LOAD_POST_DETAIL_SUCCESS = "LOAD_POST_DETAIL_SUCCESS";
export const LOAD_POST_DETAIL_FAILURE = "LOAD_POST_DETAIL_FAILURE";
export const LOAD_POST_DETAIL_RESET = "LOAD_POST_DETAIL_RESET";

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const LOAD_MORE_REQUEST = "LOAD_MORE_REQUEST";
export const LOAD_MORE_SUCCESS = "LOAD_MORE_SUCCESS";
export const LOAD_MORE_FAILURE = "LOAD_MORE_FAILURE";
export const LOAD_MORE_RESET = "LOAD_MORE_RESET";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";
export const ADD_POST_RESET = "ADD_POST_RESET";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const UPDATE_POST_REQUEST = "UPDATE_POST_REQUEST";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const UPDATE_POST_FAILURE = "UPDATE_POST_FAILURE";
export const UPDATE_POST_RESET = "UPDATE_POST_RESET";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const REMOVE_COMMENT_REQUEST = "REMOVE_COMMENT_REQUEST";
export const REMOVE_COMMENT_SUCCESS = "REMOVE_COMMENT_SUCCESS";
export const REMOVE_COMMENT_FAILURE = "REMOVE_COMMENT_FAILURE";

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";
export const LIKE_POST_RESET = "LIKE_RESET";

export const postRequestAction = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const postResetAction = () => ({
  type: ADD_POST_RESET,
});

export const updatePostResetAction = () => ({
  type: UPDATE_POST_RESET,
});

export const loadPostDetailRequestAction = (data) => ({
  type: LOAD_POST_DETAIL_REQUEST,
  data,
});

export const loadPostDetailResetAction = () => ({
  type: LOAD_POST_DETAIL_RESET,
});

export const loadPostsRequestAction = (data) => ({
  type: LOAD_POSTS_REQUEST,
  data,
});

export const loadMorePostsAction = (data) => ({
  type: LOAD_MORE_REQUEST,
  data,
});

export const loadMoreResetAction = () => ({
  type: LOAD_MORE_RESET,
});

export const removePostRequestAction = (data) => ({
  type: REMOVE_POST_REQUEST,
  data,
});

export const updatePostRequestAction = (data) => ({
  type: UPDATE_POST_REQUEST,
  data,
});

export const addCommentRequestAction = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

export const removeCommentRequestAction = (data) => ({
  type: REMOVE_COMMENT_REQUEST,
  data,
});

export const likePostRequestAction = (data) => ({
  type: LIKE_POST_REQUEST,
  data,
});
export const likeResetAction = () => ({
  type: LIKE_POST_RESET,
});

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      //디테일 페이지
      case LOAD_POST_DETAIL_REQUEST:
        draft.loadPostDetailLoading = true;
        draft.loadPostDetailDone = false;
        draft.loadPostDetailError = null;
        break;
      case LOAD_POST_DETAIL_SUCCESS:
        draft.loadPostDetailLoading = false;
        draft.loadPostDetailDone = true;
        draft.post = action.data;
        break;
      case LOAD_POST_DETAIL_FAILURE:
        draft.loadPostDetailLoading = false;
        draft.loadPostDetailError = action.error;
        break;
      case LOAD_POST_DETAIL_RESET:
        draft.loadPostsLoading = false;
        draft.post = null;
        (draft.loadPostsDone = false), (draft.loadPostsError = null);
        break;

      //글 불러오기
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.posts = action.data;
        // draft.hasMorePosts = draft.posts.length < 100;
        break;
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;

      //글 더 불러오기
      case LOAD_MORE_REQUEST:
        draft.loadMoreLoading = true;
        draft.loadMoreDone = false;
        draft.loadMoreError = null;
        break;
      case LOAD_MORE_SUCCESS:
        draft.loadMoreLoading = false;
        draft.loadMoreDone = true;
        draft.posts = draft.posts.concat(action.data);
        draft.morePosts = action.data;
        break;
      case LOAD_MORE_FAILURE:
        draft.loadMoreLoading = false;
        draft.loadMoreError = action.error;
        break;
      case LOAD_MORE_RESET:
        draft.loadMoreDone = false;
        draft.morePosts = [];
        break;

      //글 추가
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostError = null;
        draft.addPostDone = false;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        // draft.posts.unshift(action.data);
        draft.posts.unshift(action.data);
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case ADD_POST_RESET:
        draft.addPostLoading = false;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;

      //글 삭제
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;

      //글 수정
      case UPDATE_POST_REQUEST:
        draft.updatePostLoading = true;
        draft.updatePostDone = false;
        draft.updatePostError = null;
        break;
      case UPDATE_POST_SUCCESS:
        draft.updatePostLoading = false;
        draft.updatePostDone = true;
        break;
      case UPDATE_POST_FAILURE:
        draft.updatePostLoading = false;
        draft.updatePostError = action.error;
        break;
      case UPDATE_POST_RESET:
        draft.updatePostLoading = false;
        draft.updatePostDone = false;
        draft.updatePostError = null;
        break;

      //댓글 추가
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        // draft.content.unshift(action.data.content);
        draft.post.comments.push(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;

      //댓글 삭제
      case REMOVE_COMMENT_REQUEST:
        draft.removeCommentLoading = true;
        draft.removeCommentDone = false;
        draft.removeCommentError = null;
        break;
      case REMOVE_COMMENT_SUCCESS:
        draft.post.comments = draft.post.comments.filter(
          (v) => v.id !== action.data
        );
        draft.removeCommentLoading = false;
        draft.removeCommentDone = true;
        break;
      case REMOVE_COMMENT_FAILURE:
        draft.removeCommentLoading = false;
        draft.removeCommentError = action.error;
        break;

      //좋아요
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostError = null;
        draft.likePostDone = false;
        break;
      case LIKE_POST_SUCCESS:
        draft.post.likeCount =
          action.data === "like"
            ? draft.post.likeCount + 1
            : draft.post.likeCount - 1;
        draft.likePostLoading = false;
        draft.likePostError = null;
        draft.likePostDone = true;
        break;
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;
      case LIKE_POST_RESET:
        draft.likePostDone = false;
        break;

      default:
        break;
    }
  });

export default reducer;
