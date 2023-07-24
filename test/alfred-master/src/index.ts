import process from 'process';
import {Output, OutputItem} from "./output";

class Alfred {
    readonly params: string[] = process.argv.filter((_v, index) => index > 1)
    readonly input: string = process.argv.length > 2 ? process.argv[process.argv.length - 1] : ''
    get env(): AlfredEnv {
        return process.env as any;
    }

    output(output: Output, inputMatch?: ('title' | 'subtitle' | 'uid' | 'arg' | 'quicklookurl')[]) {
        const input = this.input?.toLocaleLowerCase()
        const inputArr = this.input.toLocaleLowerCase().split('|').filter(i => i);
        console.log(JSON.stringify({
            ...output,
            items: output.items.filter(i => (inputMatch && input) ?
                inputMatch.some(j => !inputArr.length || inputArr.some(t => t.split('&')
                    .every(k => `${i[j] || ''}`.toLowerCase().includes(k))))
                : true)
        }, null, '\t'))
    }

    log(...data: any[]) {
        console.error(...data)
    }

}
interface AlfredEnv {
    alfred_preferences: string;
    alfred_preferences_localhash: string;
    alfred_theme: string;
    alfred_theme_background: string;
    alfred_theme_selection_background: string;
    alfred_theme_subtext: string;
    alfred_version: string;
    alfred_version_build: string;
    alfred_workflow_bundleid: string;
    alfred_workflow_cache: string;
    alfred_workflow_data: string;
    alfred_workflow_name: string;
    alfred_workflow_uid: string;
    alfred_workflow_version: string;
    alfred_debug: '1' | '0';
}



const alfred = new Alfred()
export default alfred
export {Output, OutputItem, AlfredEnv}

