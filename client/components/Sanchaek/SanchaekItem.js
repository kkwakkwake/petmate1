import { ItemContainer, ItemWrapper, ImageWrapper, ContentArea, ContentTitle, ItemImage, ContentInfo, LocaImg } from './styled';

import { useRouter } from 'next/router';

const SanchaekItem = (post) => {
  const Router = useRouter();
  const itemSelect = () => {
    Router.push(`/sanchaek/${post.id}`);
  };

  return (
    <ItemContainer onClick={itemSelect}>
      <ItemWrapper >
        {post?.images && (
          <ImageWrapper>{post?.images?.length === 0 ? <ItemImage src='../img/defaultimg1.png' /> : <ItemImage src={post.images[0].url} />}</ImageWrapper>
        )}
        <ContentArea>
          <ContentTitle>{post.title}</ContentTitle>
          {post.mapInfo && post.mapInfo.location && (
            <ContentInfo> <LocaImg src='../img/locationEmojiBk.png' />{post.mapInfo.location}</ContentInfo>
          )}
        </ContentArea>
      </ItemWrapper>
    </ItemContainer>

  );
};

export default SanchaekItem;