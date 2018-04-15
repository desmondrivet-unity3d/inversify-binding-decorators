import interfaces from "../interfaces/interfaces";
import ProvideWhenSyntax from "./provide_when_syntax";
import ProvideDoneSyntax from "./provide_done_syntax";
import { interfaces as inversifyInterfaces } from "inversify";

class ProvideOnSyntax<T> implements interfaces.ProvideOnSyntax<T> {

    private _bindingOnSyntax: (bind: inversifyInterfaces.Bind, target: any) => inversifyInterfaces.BindingOnSyntax<T>;
    private _provideDoneSyntax: interfaces.ProvideDoneSyntax;

    public constructor(
        bindingOnSyntax: (bind: inversifyInterfaces.Bind, target: any) => inversifyInterfaces.BindingOnSyntax<T>,
        provideDoneSyntax: interfaces.ProvideDoneSyntax
    ) {
        this._bindingOnSyntax = bindingOnSyntax;
        this._provideDoneSyntax = provideDoneSyntax;
    }

    public onActivation(fn: (context: inversifyInterfaces.Context, injectable: T) => T): interfaces.ProvideWhenSyntax<T> {
        let bindingWhenSyntax = (bind: inversifyInterfaces.Bind, target: any) => this._bindingOnSyntax(bind, target).onActivation(fn);
        let onDoneSyntax = new ProvideDoneSyntax(bindingWhenSyntax);

        return new ProvideWhenSyntax(bindingWhenSyntax, onDoneSyntax);
    }

    public done(force?: boolean) {
        return this._provideDoneSyntax.done(force);
    }

}

export default ProvideOnSyntax;
