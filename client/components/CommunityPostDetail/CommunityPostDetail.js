import Link from "next/link";
import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  PostDetailContainer,
  Images,
  Title,
  PostInfo,
  KeywordWrapper,
  CommentWrapper,
  Button,
  CommentInput,
  CommentArea,
  CommentContentInfo,
  CommentHandler,
  CommentItem,
  AuthorProfile,
  AuthorInfo,
} from "./styled";
import { getElapsedTime } from "../../utils";
import {
  loadPostDetailRequestAction,
  removePostRequestAction,
  removeCommentRequestAction,
  addCommentRequestAction,
  likePostRequestAction,
} from "../../reducers/community";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { loadProfileRequestAction } from "../../reducers/user";

const CommunityPostDetail = () => {
  const likeIcon = "../img/filled_heart2.png";
  const unlikeIcon = "../img/heart2.png";
  const [cmtContent, setCmtContent] = useState("");
  const [like, setLike] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { post, loadPostDetailDone } = useSelector((state) => state.community);
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const commentInputRef = useRef();
  //carousel
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // 게시물 로드
  useEffect(() => {
    if (router.isReady && !post) {
      dispatch(loadPostDetailRequestAction(id));
    }
  }, [router.isReady, post]);

  // 내가 좋아요 누른 글 표시
  useEffect(() => {
    if (!me) {
      setLike(false);
      return;
    }
    if (post && post.likes) {
      post.likes.forEach((likers) => {
        if (likers.userId === me.id) {
          setLike(true);
          return;
        }
      });
    }
  }, [me, loadPostDetailDone]);

  const handleLike = useCallback(() => {
    if (!me) {
      alert("로그인이 필요합니다.");
      return router.push("/login");
    }
    setLike(!like);
    dispatch(likePostRequestAction(id));
  }, [like]);

  const handleCmtContent = useCallback(() => {
    if (!cmtContent.trim()) {
      return alert("내용을 입력하세요");
    }
    dispatch(addCommentRequestAction({ postId: id, content: cmtContent }));
    setCmtContent("");
    commentInputRef.current.blur();
  }, [cmtContent]);

  const keyUp = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        if (!e.target.value.trim()) {
          return alert("내용을 입력하세요");
        }
        dispatch(addCommentRequestAction({ postId: id, content: cmtContent }));
        setCmtContent("");
        commentInputRef.current.blur();
      }
    },
    [cmtContent]
  );

  const handleDeleteCmt = (commentId) => {
    if (commentId && window.confirm("댓글을 삭제하시겠습니까?")) {
      console.log(commentId);
      dispatch(removeCommentRequestAction(commentId));
    }
  };

  const handleDeletePost = () => {
    if (window.confirm("글을 삭제하겠습니까?")) {
      dispatch(removePostRequestAction(parseInt(id)));
      router.push(`/community`);
    }
  };

  const getKeywordValue = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      {post ? (
        <PostDetailContainer>
          <h1>커뮤니티</h1>
          <Title>
            <h2>{post.title}</h2>
            {me && me?.id === post?.author?.id ? (
              <div>
                <Link href={`/community/${id}/edit`}>
                  <Button>수정</Button>
                </Link>
                <Button onClick={handleDeletePost}>삭제</Button>
              </div>
            ) : null}
          </Title>
          <PostInfo>
            <div>
              <AuthorProfile>
                {post?.author?.profile?.imageUrl ? (
                  <img src={post.author.profile.imageUrl} />
                ) : (
                  <img src="../img/defaultimgGrey.png" />
                )}
              </AuthorProfile>
              <span id="post_author">{post.author.nickname}</span>
              <span id="post_created_time">
                {getElapsedTime(post.createdAt)}
              </span>
              <span id="views">조회수 {post.views}</span>
            </div>
            <div id="like_wrapper">
              <button onClick={handleLike}>
                {like ? (
                  <img src={likeIcon} alt="좋아요" />
                ) : (
                  <img src={unlikeIcon} alt="안좋아요" />
                )}
              </button>
              <span id="like_count">{post.likeCount}</span>
            </div>
          </PostInfo>
          <div id="content">
            {post.images.length !== 0 ? (
              <Images>
                <Slider {...settings}>
                  {post.images.map((img) => (
                    <div key={img}>
                      <img src={img.url} alt="이미지" />
                    </div>
                  ))}
                </Slider>
              </Images>
            ) : null}
            <div id="content_text">
              <p>{post.content}</p>
            </div>
            <KeywordWrapper>
              <div id="keyword_area">
                {post.tags &&
                  post.tags.map((tag) => (
                    <Link
                      href={`/search/hashtag?keyword=${tag.hashtag.keyword}`}
                      key={tag.id}
                      passHref
                    >
                      <button
                        onClick={getKeywordValue}
                        className="keyword_item"
                      >
                        <span>{tag.hashtag.keyword}</span>
                      </button>
                    </Link>
                  ))}
              </div>
            </KeywordWrapper>
            <CommentWrapper>
              <h2>
                댓글 <span>{post.comments.length}</span>
              </h2>
              <CommentInput>
                <input
                  ref={commentInputRef}
                  onKeyUp={keyUp}
                  onChange={(e) => setCmtContent(e.target.value)}
                  value={cmtContent}
                  type="text"
                  placeholder="댓글을 남겨보세요."
                />
                <Button onClick={handleCmtContent}>입력</Button>
              </CommentInput>
              <CommentArea>
                {post.comments &&
                  post.comments
                    .slice(0)
                    .reverse()
                    .map((comment) => (
                      <CommentItem key={comment.id}>
                        <CommentHandler>
                          <AuthorInfo>
                            <AuthorProfile>
                              {comment?.author?.profile?.imageUrl ? (
                                <img src={comment.author.profile.imageUrl} />
                              ) : (
                                <img src="../img/defaultimgGrey.png" />
                              )}
                            </AuthorProfile>
                            <h3>{comment.author.nickname}</h3>
                          </AuthorInfo>
                          <CommentContentInfo>
                            <span>{getElapsedTime(comment.createdAt)}</span>
                            {comment?.author?.id === me?.id ? (
                              <>
                                <span>·</span>
                                <span
                                  id="delete_btn"
                                  onClick={() => handleDeleteCmt(comment.id)}
                                >
                                  삭제
                                </span>
                              </>
                            ) : null}
                          </CommentContentInfo>
                        </CommentHandler>

                        <p>{comment.content}</p>
                      </CommentItem>
                    ))}
              </CommentArea>
            </CommentWrapper>
          </div>
        </PostDetailContainer>
      ) : null}
    </>
  );
};

export default CommunityPostDetail;
