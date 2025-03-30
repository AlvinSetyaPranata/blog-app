import React from 'react'
import CardWithOption from '../../components/Cards/CardWithOption'
import { AnimatePresence } from 'motion/react';

const DUMMY_DATA = [
  {
    title: "Cinta di langit dubai",
    desc: "21 Feb 2024",
    imageURL: "/woman-eyes.jpg",
  },
  {
    title: "Cinta di langit dubai",
    desc: "21 Feb 2024",
    imageURL: "/woman-eyes.jpg",
  },
  {
    title: "Cinta di langit dubai",
    desc: "21 Feb 2024",
    imageURL: "/woman-eyes.jpg",
  },
];

export default function Blogs() {

  const onRemoveHandler = (id) => {
      DUMMY_DATA.splice(id, 1)
  }

  return (
    <div className='pl-12 grid grid-cols-3 gap-x-6'>
      <AnimatePresence>
        {DUMMY_DATA.map((item, index) => (
          <CardWithOption
            title={item.title}
            desc={item.desc}
            imageURL={item.imageURL}
            key={index}
            id={index}
            onRemove={onRemoveHandler}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
