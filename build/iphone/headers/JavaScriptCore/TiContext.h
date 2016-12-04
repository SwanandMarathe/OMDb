/**
 * OMDb OMDb License
 * This source code and all modifications done by OMDb
 * are licensed under the Apache Public License (version 2) and
 * are Copyright (c) 2009-2014 by OMDb, Inc.
 */

/*
 * Copyright (C) 2013 Apple Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE INC. ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE INC. OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

#ifndef TiContext_h
#define TiContext_h

#include <JavaScriptCore/Ti.h>

#if JSC_OBJC_API_ENABLED

@class TiVirtualMachine, TiValue;

/*!
@interface
@discussion An instance of TiContext represents a JavaScript execution environment. All
 JavaScript execution takes place within a context.
 TiContext is also used to manage the life-cycle of objects within the
 JavaScript virtual machine. Every instance of TiValue is associated with a
 TiContext via a strong reference. The TiValue will keep the TiContext it
 references alive so long as the TiValue remains alive. When all of the TiValues
 that reference a particular TiContext have been deallocated the TiContext
 will be deallocated unless it has been previously retained.
*/
NS_CLASS_AVAILABLE(10_9, 7_0)
@interface TiContext : NSObject

/*!
@methodgroup Creating New TiContexts
*/
/*!
@method
@abstract Create a TiContext.
@result The new context.
*/
- (instancetype)init;

/*!
@method
@abstract Create a TiContext in the specified virtual machine.
@param virtualMachine The TiVirtualMachine in which the context will be created.
@result The new context.
*/
- (instancetype)initWithVirtualMachine:(TiVirtualMachine *)virtualMachine;

/*!
@methodgroup Evaluating Scripts
*/
/*!
@method
@abstract Evaluate a string of JavaScript code.
@param script A string containing the JavaScript code to evaluate.
@result The last value generated by the script.
*/
- (TiValue *)evaluateScript:(NSString *)script;

/*!
@methodgroup Callback Accessors
*/
/*!
@method
@abstract Get the TiContext that is currently executing.
@discussion This method may be called from within an Objective-C block or method invoked
 as a callback from JavaScript to retrieve the callback's context. Outside of
 a callback from JavaScript this method will return nil.
@result The currently executing TiContext or nil if there isn't one.
*/
+ (TiContext *)currentContext;

/*!
@method
@abstract Get the <code>this</code> value of the currently executing method.
@discussion This method may be called from within an Objective-C block or method invoked
 as a callback from JavaScript to retrieve the callback's this value. Outside
 of a callback from JavaScript this method will return nil.
@result The current <code>this</code> value or nil if there isn't one.
*/
+ (TiValue *)currentThis;

/*!
@method
@abstract Get the arguments to the current callback.
@discussion This method may be called from within an Objective-C block or method invoked
 as a callback from JavaScript to retrieve the callback's arguments, objects
 in the returned array are instances of TiValue. Outside of a callback from
 JavaScript this method will return nil.
@result An NSArray of the arguments nil if there is no current callback.
*/
+ (NSArray *)currentArguments;

/*!
@methodgroup Global Properties
*/
/*!
@property
@abstract Get the global object of the context.
@discussion This method retrieves the global object of the JavaScript execution context.
 Instances of TiContext originating from WebKit will return a reference to the
 WindowProxy object.
@result The global object.
*/
@property (readonly, strong) TiValue *globalObject;

/*!
@property
@discussion The <code>exception</code> property may be used to throw an exception to JavaScript.
 
 Before a callback is made from JavaScript to an Objective-C block or method,
 the prior value of the exception property will be preserved and the property
 will be set to nil. After the callback has completed the new value of the
 exception property will be read, and prior value restored. If the new value
 of exception is not nil, the callback will result in that value being thrown.
 
 This property may also be used to check for uncaught exceptions arising from
 API function calls (since the default behaviour of <code>exceptionHandler</code> is to
 assign an uncaught exception to this property).

 If a TiValue originating from a different TiVirtualMachine than this context
 is assigned to this property, an Objective-C exception will be raised.
*/
@property (strong) TiValue *exception;

/*!
@property
@discussion If a call to an API function results in an uncaught JavaScript exception, the
 <code>exceptionHandler</code> block will be invoked. The default implementation for the
 exception handler will store the exception to the exception property on
 context. As a consequence the default behaviour is for unhandled exceptions
 occurring within a callback from JavaScript to be rethrown upon return.
 Setting this value to nil will result in all uncaught exceptions thrown from
 the API being silently consumed.
*/
@property (copy) void(^exceptionHandler)(TiContext *context, TiValue *exception);

/*!
@property
@discussion All instances of TiContext are associated with a single TiVirtualMachine. The
 virtual machine provides an "object space" or set of execution resources.
*/
@property (readonly, strong) TiVirtualMachine *virtualMachine;

/*!
@property
@discussion Name of the TiContext. Exposed when remote debugging the context.
*/
@property (copy) NSString *name;

@end

/*!
@category
@discussion Instances of TiContext implement the following methods in order to enable
 support for subscript access by key and index, for example:

@textblock
    TiContext *context;
    TiValue *v = context[@"X"]; // Get value for "X" from the global object.
    context[@"Y"] = v;          // Assign 'v' to "Y" on the global object.
@/textblock

 An object key passed as a subscript will be converted to a JavaScript value,
 and then the value converted to a string used to resolve a property of the
 global object.
*/
@interface TiContext (SubscriptSupport)

/*!
method
@abstract Get a particular property on the global object.
@param key
@result The TiValue for the global object's property.
*/
- (TiValue *)objectForKeyedSubscript:(id)key;

/*!
method
@abstract Set a particular property on the global object.
@param object
@param key
*/
- (void)setObject:(id)object forKeyedSubscript:(NSObject <NSCopying> *)key;

@end

/*!
@category
@discussion These functions are for bridging between the C API and the Objective-C API.
*/
@interface TiContext (TiContextRefSupport)

/*!
@method
@abstract Create a TiContext, wrapping its C API counterpart.
@param jsGlobalContextRef
@result The TiContext equivalent of the provided TiGlobalContextRef.
*/
+ (TiContext *)contextWithTiGlobalContextRef:(TiGlobalContextRef)jsGlobalContextRef;

/*!
@property
@abstract Get the C API counterpart wrapped by a TiContext.
@result The C API equivalent of this TiContext.
*/
@property (readonly) TiGlobalContextRef TiGlobalContextRef;
@end

#endif

#endif // TiContext_h
