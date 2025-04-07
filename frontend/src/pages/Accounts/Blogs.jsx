import React, { useState } from "react";
import CardWithOption from "../../components/Cards/CardWithOption";
import { AnimatePresence, easeInOut, motion, Reorder } from "motion/react";

const DUMMY_DATA = [
  {
    id: 0,
    title: "Cinta di langit dubai 1",
    desc: "21 Feb 2024",
    imageURL: "/woman-eyes.jpg",
    isRemoving: false
  },
  {
    id: 1,
    title: "Cinta di langit dubai 2",
    desc: "21 Feb 2024",
    imageURL: "/woman-eyes.jpg",
    isRemoving: false
  },
  {
    id: 2,
    title: "Cinta di langit dubai 3",
    desc: "21 Feb 2024",
    imageURL: "/woman-eyes.jpg",
    isRemoving: false
  },
];

export default function Blogs() {
  const [data, setData] = useState(DUMMY_DATA);

  const onRemoveHandler = (id) => {
    console.log(id)

    setData(state => state.map(item => {

      if (item.id == id) {
        item.isRemoving = true
      }

      return item
    }))
    console.log(data)

    setTimeout(
      () => setData((state) => state.filter((_, index) => index != id)),
      300
    );
  };
  
  const itemVariant = {
    initial: {
      scale: 1,
      opacity: 1
    },

    animate: {
      scale: 0,
      opacity: 0
    }

    
  }

  return (
    <div className="pl-12">
      <Reorder.Group as="div" axis="x" onReorder={setData} values={data}>
        <div className="grid grid-cols-3 gap-x-6">
          <AnimatePresence>
            {data.map((item, index) => (
              <Reorder.Item
                as="div"
                value={item}
                id={`card-${index}`}
                key={`card-${index}`}
                initial="initial"
                exit="animate"
                animate={item.isRemoving ? "animate" : "initial"}
                variants={itemVariant}
                transition={{ duration: 0.8, ease: easeInOut }}
              >
                <CardWithOption
                  title={item.title}
                  desc={item.desc}
                  imageURL={item.imageURL}
                  id={item.id}
                  onRemove={onRemoveHandler}
                />
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </div>
      </Reorder.Group>
    </div>
  );
}
