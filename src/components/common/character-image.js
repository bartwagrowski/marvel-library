const CharacterImage = ({ thumbnail, imageClass }) => <img src={thumbnail.path + '.' + thumbnail.extension} alt='character portrait' className={imageClass} />;

export default CharacterImage;
