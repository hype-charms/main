import { HypeItemReference, ProductFilters } from "@hype-charms/types"

export const filterProducts = (items: HypeItemReference[] | undefined, filter: ProductFilters | undefined) => {
    switch (filter) {
        case ProductFilters.A_TO_Z:
            return items?.map(x => x).sort((a, b) => ('' + a.name).localeCompare(b.name!))
        case ProductFilters.Z_TO_A:
            return items?.map(x => x).sort((a, b) => ('' + b.name).localeCompare(a.name!))
        case ProductFilters.FEATURED:
            return items
        case ProductFilters.HIGH_TO_LOW:
            return items?.filter(x => x.unit_amount).map(x => x).sort((a, b) => b.unit_amount! - a.unit_amount!)
        case ProductFilters.LOW_TO_HIGH:
            return items?.filter(x => x.unit_amount).map(x => x).sort((a, b) => a.unit_amount! - b.unit_amount!)
        case ProductFilters.NEW_TO_OLD:
            return items?.map(x => x).sort((a, b) => b.created! - a.created!)
        case ProductFilters.OLD_TO_NEW:
            return items?.map(x => x).sort((a, b) => a.created! - b.created!)
        default: return items;
    }
}