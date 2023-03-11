/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from "react"
import { useAppSelector } from "../../+state"
import { useRouter } from 'next/router'
import { useNavigateToProduct } from "../../+state/hooks";
import { SearchReference } from "../../models";
import { StripeItemReference } from "@hype-charms/types";

export const SearchComponent: FC<{ screenPositionAtZero: boolean, items: StripeItemReference[] }> = ({ screenPositionAtZero, items }) => {

    const [results, setResults] = useState<SearchReference[]>([]);
    const [value, setValue] = useState<string>("");
    const [dropdown, setDropdown] = useState<boolean>(false)
    const router = useRouter()
    const navigateToProduct = useNavigateToProduct();
    const searchRefs = useAppSelector(state => state.applicationReducer.searchReferences)
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    const findAllReferences = (target: string): SearchReference[] => {
        const output = searchRefs.filter(x => x.value?.toLowerCase().includes(target.toLowerCase()))
        return output
    }

    const runSearch = useCallback(() => {
        if (items) {
            const results = findAllReferences(value);
            setResults(results);
        }
    }, [items, value])

    useEffect(() => {
        runSearch()
    }, [value, runSearch])

    return (
        <>
            <input
                ref={inputRef}
                type="text"
                list="results"
                className={`w-full rounded-xl pl-5 ${screenPositionAtZero ? 'bg-primary h-10 ' : 'bg-[#707070] h-8'} text-primary-text transition-all duration-500`}
                placeholder="search store..."
                value={value}
                onClick={() => setDropdown(true)}
                onChange={e => handleChange(e)}
                onBlur={() => setTimeout(() => setDropdown(false), 100)}
            >
            </input>
            {dropdown && <div id="results" className="absolute bg-secondary-dark w-[30rem] pt-6 " style={{ zIndex: -1, width: inputRef.current?.clientWidth }}>
                {!value && navigation.map((data, idx) => <option
                    key={idx}
                    id="results"
                    value={data.items}
                    className="flex flex-row justify-between items-center  bg-stone-900 p-3 hover:bg-stone-800 cursor-pointer"
                    onClick={() => router.push(data.href)}>{data.items}</option>)}
                {value && results && results.map((data, idx) => <option
                    key={idx}
                    id="results"
                    value={data.value}
                    className="flex flex-row justify-between items-center  bg-stone-900 p-3 hover:bg-stone-800 cursor-pointer"
                    onClick={() => data.type === 'product' ? navigateToProduct(data.id) : navigateToProduct(data.id)}>{data.value}</option>
                )}
            </div>}
        </>
    )
}

const navigation = [
    { type: 'navigation', items: ['Home'], href: '/' },
    { type: 'navigation', items: ['All products'], href: '/products' },
    { type: 'navigation', items: ['Charms'], href: '/products/?type=charms' },
    { type: 'navigation', items: ['Charm packs'], href: '/products/?type=packs' },
    { type: 'navigation', items: ['Key rings'], href: '/products/?type=charms' },
]