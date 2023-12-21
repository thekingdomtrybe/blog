import Styles from './styles.module.css';

function Welcome() {
  return (
    <div className={Styles.container}>
      <h1 className="hidden">THE KINGDOM TRYBE BLOG</h1>
      <p className="hidden">
        In the fast-paced landscape of today&apos;s world,
        navigating life&apos;s complexities can be daunting.
        This initiative endeavors to explore the intersection
        of modern living and timeless wisdom. Through this
        platform, insightful writers will delve into a diverse
        array of topics, offering perspectives, reflections,
        and practical insights to empower individuals in their
        journey through the intricacies of contemporary existence.
      </p>
      <img loading="lazy" className={`bg ${Styles['bg-1']}`} alt="" src="bg.png" />
      <img loading="lazy" className={`bg ${Styles['bg-2']}`} alt="" src="bg.png" />
      <img loading="lazy" className={`bg ${Styles['bg-3']}`} alt="" src="bg.png" />
    </div>
  )
}

export default Welcome
