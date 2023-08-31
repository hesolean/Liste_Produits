// on crée la table de données
const PRODUCTS = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
  ];

class SearcheBar extends React.Component {
    constructor(props) {
        super(props)
        this.handelFilterTextChange = this.handelFilterTextChange.bind(this)
        this.handelInStockChange = this.handelInStockChange.bind(this)

    }

    handelFilterTextChange(e) {
        // on appelle la méthode du composant parent pour passer l'information
        this.props.onFilterTextChange(e.target.value)
    }

    handelInStockChange(e) {
        // on appelle la méthode du composant parent pour passer l'information
        this.props.onInStockOnlyChange(e.target.checked)
    }

    render() {
        const {filterText, inStockOnly} = this.props
        return <div className="mb-2">
            <div className="form-group mb-0">
                <input 
                    type="text" 
                    value={filterText} 
                    placeholder="Rechercher" 
                    onChange={this.handelFilterTextChange}
                />
                
            </div>
            <div className="form-check" >
                <input 
                    type="checkbox" 
                    checked={inStockOnly} 
                    className="form-check-input" 
                    id="stock"
                    onChange={this.handelInStockChange}
                />
                <label htmlFor="stock" className="form-group-label">
                    Ne montrer que les produits en stock
                </label>
            </div>
        </div>
    }
}

function ProductTable({products, inStockOnly, filterText}) {
    const rows = []
    // on piste la dernière catégorie rencontrée
    let lastCategory = null

    // on fait une boucle pour passer en revue tous les produits en mettant
    // une condition sur la catégorie pour changer de groupe

    products.forEach((product => {
        if ((inStockOnly && !product.stocked) || product.name.indexOf(filterText) === -1) {
            return
        }
        
        if (product.category !== lastCategory) {
            lastCategory = product.category
            // à chaque nouvelle categorie, je pousse le nom de la categorie
            rows.push(<ProductCategoryRow key={lastCategory} category={lastCategory} />)
        }
        // puis je pousse chaque ligne de la même catégorie
        rows.push(<ProductRow key={product.name} product={product} />)
    }))
    return <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Nom des produits</th>
                        <th scope="col">Prix ($)</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>    
}

function ProductCategoryRow({category}) {
    return <tr>
        <th colSpan="2">{category}</th>
    </tr>
}

function ProductRow({product}) {
    const name = product.stocked ? 
        product.name : 
        // si on n'utilise pas bootstrp, on remplace par style={{color: "red"}}
        <span className="text-danger">{product.name}</span>
    return <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
}
        

class FilterableProducTable extends React.Component {
constructor(props) {
    super(props)
    this.state = {
        filterText: "Foot",
        inStockOnly: false
    }
    this.handelFilterTextChange = this.handelFilterTextChange.bind(this)
    this.handelInStockChange = this.handelInStockChange.bind(this)

}

handelFilterTextChange(filterText){
    this.setState({filterText})
}

handelInStockChange(inStockOnly){
    this.setState({inStockOnly})
}

render() {
    const {products} = this.props
    return <React.Fragment>
        {JSON.stringify(this.state)}
        <SearcheBar 
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly} 
            onFilterTextChange={this.handelFilterTextChange} 
            onInStockOnlyChange={this.handelInStockChange}
        />
        <ProductTable 
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
            products={products}
        />
    </React.Fragment>
}
}

ReactDOM.render(<FilterableProducTable products={PRODUCTS} />, document.querySelector("#app"))