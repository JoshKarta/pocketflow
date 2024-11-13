import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { TransactionType } from "@/lib/types";
import { Category } from "@prisma/client";
import { PopoverContent } from "@radix-ui/react-popover";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback } from "react";
import CreateCategoryDialog from "./CreateCategoryDialog";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  type: TransactionType;
  onChange: (value: string) => void;
}

export default function CategoryPicker({ type, onChange }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    if (!value) return;
    // When value changes, call onChange callback
    onChange(value);
  }, [onChange, value]);

  const categoriesQuery = useQuery({
    queryKey: ["categories", type],
    queryFn: async () => {
      const response = await fetch(`/api/categories?type=${type}`);
      return await response.json();
    },
  });

  const selectedCategory = categoriesQuery.data?.find(
    (cat: Category) => cat.name === value
  );

  const successCallback = useCallback(
    (category: Category) => {
      setValue(category.name);
      setOpen((prev) => !prev);
    },
    [setValue, setOpen]
  );
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          role={"combobox"}
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedCategory ? (
            <CategoryRow category={selectedCategory} />
          ) : (
            "Select Category"
          )}
          <ChevronsUpDown className="icon-size ml-2 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <CommandInput placeholder="Search category" />
          <CreateCategoryDialog type={type} successCallback={successCallback} />
          <CommandEmpty>
            <p>Category not found</p>
            <p className="text-xs text-muted-foreground">
              Tip: Create new category
            </p>
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {categoriesQuery.data &&
                categoriesQuery.data.map((cat: Category) => (
                  <CommandItem
                    key={cat.name}
                    onSelect={() => {
                      setValue(cat.name);
                      setOpen((prev) => !prev);
                    }}
                  >
                    <CategoryRow category={cat} />
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 opacity-0",
                        value === cat.name && "opacity-100"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function CategoryRow({ category }: { category: Category }) {
  return (
    <div className="flex items-center gap-2">
      <span role="img">{category.icon}</span>
      <span>{category.name}</span>
    </div>
  );
}
