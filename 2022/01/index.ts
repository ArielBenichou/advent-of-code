import { readInput } from "../../utils/load-input";

class Elf {
    private inventory: number[];
    private position:number;
    readonly capacity:number;

    constructor(inventory:number[], position = 0) {
        this.inventory = inventory;
        this.position = position;
        this.capacity = this.calculateTotalCapacity();
    }

    private calculateTotalCapacity() {
        return this.inventory.reduce((acc,el)=>acc+el,0);
    }
}

/**
 * ElvesCompany are sorted by biggest capacity first
 */
class ElvesCompany {
    private elves:Elf[];
    constructor(elves: Elf[]) {
        this.elves = elves.sort((a,b)=>b.capacity - a.capacity);
    }

    static createFromInput(input:string) {
        const elves: Elf[] = [];
        let list:number[] = [];
        let i = 0;

        for(let line of input.split("\n")) {
            if(line==='') {
                elves.push(new Elf(list, i));
                i++;
                list = [];
            } else {
                list.push(+line);
            }
        }
        return new ElvesCompany(elves);
    }

    sliceElvesCompany(start:number,end:number) {
        return new ElvesCompany(this.elves.slice(start, end));
    }

    getTotalCapacity() {
        return this.elves.reduce((acc, elf) => acc + elf.capacity, 0);
    }

    getElf(index: number) {
        return this.elves[index];
    }
}

function getOutput() {
    const input = readInput(__dirname + "/input.txt");
    if (!input) {
        throw new Error("input is falsy")
    }
    const elves = ElvesCompany.createFromInput(input);

    console.log(elves.sliceElvesCompany(0,3).getTotalCapacity());

}

getOutput();