import styles from './character-details-list.module.css';

const CharacterDetailsList = ({ headline, items }) => {
    let content = <span>Not found</span>;

    if (items.length) {
        const list = items.map((story) => (
            <li className={styles.listItem} key={story.name}>
                {story.name}
            </li>
        ));
        content = <ul className={styles.listContainer}>{list}</ul>;
    }

    return (
        <section>
            <h3>{headline}</h3>
            {content}
        </section>
    );
};

export default CharacterDetailsList;
