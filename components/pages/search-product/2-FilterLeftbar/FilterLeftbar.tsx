// 'use client'

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '@/components/ui/accordion'
// import { Input } from '@/components/ui/input'
// import { useSearchFilter } from '@/contexts/pages/homepage/search-filter-context'
// import React from 'react'

// const FilterLeftbar: React.FC = () => {
//   const { isDisabled, isLoading, handleSubmit } = useSearchFilter()

//   return (
//     <div className="flex w-full flex-col gap-6">
//       <Accordion type="single" collapsible className="w-full">
//         <AccordionItem value="item-1">
//           <AccordionTrigger>
//             <p className="text-l-medium text-neutral-900">Harga</p>
//           </AccordionTrigger>
//           <AccordionContent>
//             <div className="flex flex-col">
//               <div className="mb-2 flex justify-between">
//                 <p className="text-m-regular text-neutral-500">Dari</p>
//                 <p className="text-m-regular text-right text-neutral-500">
//                   Hingga
//                 </p>
//               </div>
//               <div className="flex items-center justify-between self-stretch">
//                 <Input
//                   startIcon
//                   className="rounded-lg border-[0.5px] border-neutral-200 p-2"
//                   onChange={(e) =>
//                     handleInputChange('hargaMin', e.target.value)
//                   }
//                 />
//                 <div className="h-px w-5 flex-none bg-[#D2D2D1] sm:mx-5 xl:mx-10" />
//                 <Input
//                   className="rounded-lg border-[0.5px] border-neutral-200 p-2 text-right"
//                   align="text-right"
//                 />
//               </div>
//             </div>
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>
//     </div>
//   )
// }

// export default React.memo(FilterLeftbar)
