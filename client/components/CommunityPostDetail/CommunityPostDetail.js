import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
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
} from "./styled";
import { getElapsedTime } from "../../utils";
import {
  loadPostDetailRequestAction,
  removePostRequestAction,
} from "../../reducers/community";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

const CommunityPostDetail = () => {
  const likeIcon = "../img/filled_heart2.png";
  const unlikeIcon = "../img/heart2.png";
  const router = useRouter();
  const { id } = router.query;
  const { post } = useSelector((state) => state.community);
  const dispatch = useDispatch();
  const [cmtContent, setCmtContent] = useState("");
  const [cmtContentArr, setCmtContentArr] = useState([]);
  const [like, setLike] = useState(false);

  //carousel
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    if (router.isReady) {
      dispatch(loadPostDetailRequestAction(id));
    }
  }, [router.isReady]);

  const handleLike = useCallback(() => {
    setLike(!like);
  }, [like]);

  const handleCmtContent = useCallback(
    (e) => {
      if (cmtContent || (e.keyCode === 13 && e.target.value.trim() !== "")) {
        setCmtContentArr([...cmtContentArr, cmtContent]);
      }
      setCmtContent("");
    },
    [cmtContent]
  );

  const handleDeleteCmt = (id) => {
    setCmtContentArr(cmtContentArr.filter((it) => it.id !== id));
  };

  const handleDeletePost = () => {
    if (window.confirm("글을 삭제하겠습니까?")) {
      console.log("글 삭제");
      dispatch(removePostRequestAction(parseInt(id)));
      router.push(`/community`);
    }
  };

  const editing = useSelector((state) => state.community.editing);

  return (
    <>
      {post && (
        <PostDetailContainer>
          <h1>커뮤니티</h1>
          <Title>
            <h2>{post.title}</h2>
            <div>
              <Link href={`/community/${id}/new`}>
                <Button>수정</Button>
              </Link>
              <Button onClick={handleDeletePost}>삭제</Button>
            </div>
          </Title>
          <PostInfo>
            <div>
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
                    <button key={tag.id} className="keyword_item">
                      <span>{tag.hashtag.keyword}</span>
                    </button>
                  ))}
              </div>
            </KeywordWrapper>
            <CommentWrapper>
              <h2>
                댓글 <span>{post.comments.length}</span>
              </h2>
              <div id="cmt_input">
                <input
                  onKeyUp={handleCmtContent}
                  onChange={(e) => setCmtContent(e.target.value)}
                  value={cmtContent}
                  type="text"
                  placeholder="댓글을 남겨보세요."
                />
                <Button onClick={handleCmtContent}>입력</Button>
              </div>
              <div id="cmts_area">
                {post.comments &&
                  post.comments
                    .slice(0)
                    .reverse()
                    .map((comment) => (
                      <div key={comment.id} className="cmts">
                        <h3>{comment.author.nickname}</h3>
                        <p>{comment.content}</p>
                      </div>
                    ))}
              </div>
            </CommentWrapper>
          </div>
        </PostDetailContainer>
      )}
    </>
  );
};

export default CommunityPostDetail;
