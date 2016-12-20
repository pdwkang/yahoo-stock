// 1. make get json into a function
// 2. instaed of auto saving their symbols, you give them a save button
// 3. retrieve button
// 4. put bookmarks on the side of the page2
// 5. Automatically refresh all stocks every x seconds
// 6. keep the watchlist stock in a separate table from searched stocks
// 7. keep a 'recent' localstorage var, and a 'saved' localstorage var
// 8. pair up the blackjack

var userStocksSaved
var symbol
var loopON = false;
$(document).ready(function(){
	$('.save').click(function(){
		localStorage.setItem("userStocks", $('#symbol').val());
		//naming it as "userStocks"
	})
	$('.clear').click(function(){
		// $('#stock-body').html("");
		$('#stock-body').html("")
		localstorage.setItem("userStocks", "");
	})
	$('.retrieve').click(function(){
		runJSON(userStocksSaved);
		userStocksSaved = localStorage.getItem('userStocks');
	})
	$('.yahoo-form').submit(function(){
		event.preventDefault();
		symbol = $('#symbol').val();
		runJSON(symbol);
		loopOn = true;
		// setInterval(runJSON,6000)
	});
});

function runJSON(userStocksSavedOrsymbol){
	// userStocksSavedOrsymbol = symbol
	var url = `http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20
	("${userStocksSavedOrsymbol}")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json`;
	$.getJSON(url, function(dataJSGotIfAny){
		var stockInfo = dataJSGotIfAny.query.results.quote;
		$('#stock-body').html('')
		if(dataJSGotIfAny.query.count == 1){
			var htmlToPlot = buildStockRow(stockInfo);
			$('#stock-body').append(htmlToPlot);				
			console.log('cccc')
		}else{
			$('#stock-body').html('')
			for(let i = 0; i < stockInfo.length; i++){
				var htmlToPlot = buildStockRow(stockInfo[i]);
				$('#stock-body').prepend(htmlToPlot);
				// console.log(htmlToPlot)
			}
		}
	}); console.log('aaaa')
}

function buildStockRow(stock){
	if(stock.Change.indexOf('+') > -1 ){
		var classChange = "success";
	}else{
		var classChange = "danger";
	}
	var newHTML = '';
	newHTML += '<tr>';
		newHTML += '<td>'+stock.Symbol+'</td>';
		newHTML += '<td>'+stock.Name+'</td>';
		newHTML += '<td>'+stock.Ask+'</td>';
		newHTML += '<td>'+stock.Bid+'</td>';
		newHTML += '<td class="btn-'
		+classChange
		+'">'+stock.Change+'</td>';
	newHTML += '</tr>';
	return newHTML;
}


$(document).ready(function(){
	$('#arrow1').click(function(){
		$('#page1, #page2').animate({
			'right':'100vw'
		},100);
	})
	$('#arrow2').click(function(){
		$('#page1, #page2').animate({
			'right':'0vw'
		},100);	
	})
});

// symbol = 'aapl'
// setInterval(runJSON,10000)
// runJSON(symbol)